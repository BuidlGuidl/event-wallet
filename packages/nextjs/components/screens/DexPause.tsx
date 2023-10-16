import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useSigner } from "wagmi";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { notification } from "~~/utils/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";

type DexesPaused = { [key: string]: boolean };

export const DexPause = () => {
  const { data: signer } = useSigner();

  const [isLoading, setIsLoading] = useState(true);
  const [dexesPaused, setDexesPaused] = useState<DexesPaused>({});
  const [selectedDexes, setSelectedDexes] = useState<string[]>([]);
  const [isMining, setIsMining] = useState(false);

  const dexContracts: { [key: string]: ethers.Contract } = {};

  const tokens = scaffoldConfig.tokens;

  tokens.forEach(token => {
    const contractDexName: ContractName = `BasicDex${token.name}` as ContractName;

    // The tokens array should not change, so this should be safe. Anyway, we can refactor this later.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: dex } = useScaffoldContract({
      contractName: contractDexName,
      signerOrProvider: signer || undefined,
    });
    if (dex) {
      dexContracts[token.name] = dex;
    }
  });

  const updateDexesData = async () => {
    const pausedData: { [key: string]: boolean } = {};

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const dexContract = dexContracts[token.name];

      if (dexContract) {
        const paused = await dexContract.paused();

        pausedData[token.name] = paused;
      }
    }

    setDexesPaused(pausedData);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (Object.keys(dexContracts).length === tokens.length) {
        await updateDexesData();
      }
    })();
  }, [Object.keys(dexContracts).length]);

  const checkAllDexes = () => {
    setSelectedDexes(tokens.map(token => token.name));
  };

  const handlePause = async () => {
    if (selectedDexes.length === 0) {
      notification.error("Please check at least one dex");
      return;
    }

    setIsMining(true);

    try {
      for (let i = 0; i < selectedDexes.length; i++) {
        const dexName = selectedDexes[i];
        const dexContract = dexContracts[dexName];

        if (dexContract) {
          await dexContract.pause();
        }
      }
    } catch (error: any) {
      notification.error(error);
    } finally {
      updateDexesData();
      setSelectedDexes([]);
      setIsMining(false);
    }
  };

  const handleUnpause = async () => {
    if (selectedDexes.length === 0) {
      notification.error("Please check at least one dex");
      return;
    }

    setIsMining(true);

    try {
      for (let i = 0; i < selectedDexes.length; i++) {
        const dexName = selectedDexes[i];
        const dexContract = dexContracts[dexName];

        if (dexContract) {
          await dexContract.unpause();
        }
      }
    } catch (error: any) {
      notification.error(error);
    } finally {
      updateDexesData();
      setSelectedDexes([]);
      setIsMining(false);
    }
  };

  const handleCheck = async (name: string, checked: boolean) => {
    if (checked) {
      setSelectedDexes([...selectedDexes, name]);
    } else {
      setSelectedDexes(selectedDexes.filter(a => a !== name));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="max-w-96 p-8">
        <h1 className="text-4xl font-bold">Dexes Status</h1>
      </div>
      <div className="flex flex-col pt-2 gap-[100px] md:flex-row">
        {isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex gap-x-20 justify-center mb-8">
              <button className="btn btn-primary w-[300px]" onClick={handlePause} disabled={isMining}>
                Pause Selected Dexes
              </button>
              <button className="btn btn-primary w-[300px]" onClick={handleUnpause} disabled={isMining}>
                Unpause Selected Dexes
              </button>
            </div>
            <div className="flex gap-x-20 justify-center">
              <table className="table table-zebra self-start">
                <thead>
                  <tr className="text-center">
                    <th>Dex</th>
                    <th>Status</th>
                    <th>
                      <input
                        type="checkbox"
                        onChange={e => {
                          if (e.target.checked) {
                            checkAllDexes();
                          } else {
                            setSelectedDexes([]);
                          }
                        }}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map(token => (
                    <tr className="text-center" key={token.name}>
                      <td>{token.name}</td>
                      <td>{dexesPaused[token.name] ? "Paused" : "Unpaused"}</td>
                      <td>
                        <input
                          type="checkbox"
                          value={token.name}
                          checked={selectedDexes.includes(token.name)}
                          onChange={e => {
                            handleCheck(token.name, e.target.checked);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
