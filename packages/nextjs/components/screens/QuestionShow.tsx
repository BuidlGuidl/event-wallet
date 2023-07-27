import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useInterval } from "usehooks-ts";
import { useAccount } from "wagmi";
import { loadBurnerSK } from "~~/hooks/scaffold-eth";
import untypedQuestions from "~~/questions.json";
import scaffoldConfig from "~~/scaffold.config";
import { useAppStore } from "~~/services/store/store";
import { Question } from "~~/types/question";
import { notification } from "~~/utils/scaffold-eth";

export const QuestionShow = () => {
  const payload = useAppStore(state => state.screenPayload);
  const id = payload?.questionId;

  const questionId: number = parseInt(id as string);

  const question: Question | undefined = untypedQuestions.find(q => q.id === questionId);

  const { address } = useAccount();
  const [processing, setProcessing] = useState(false);
  const [loadingQuestionStatus, setLoadingQuestionStatus] = useState(true);
  const [questionStatus, setQuestionStatus] = useState<string>("closed");
  const [questionRightOption, setQuestionRightOption] = useState<number>();
  const [selectedOption, setSelectedOption] = useState<string>();

  const fetchQuestionStatus = async () => {
    try {
      const response = await fetch(`/api/questions/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("data", data);

      if (response.ok) {
        setQuestionStatus(data.status);
        if (data.status === "reveal") {
          setQuestionRightOption(data.option);
        }
      } else {
        notification.error(data.error);
      }
    } catch (e) {
      console.log("Error fetching questions opened", e);
    } finally {
      setLoadingQuestionStatus(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (question) {
        await fetchQuestionStatus();
      }
    })();
  }, [question]);

  useInterval(async () => {
    await fetchQuestionStatus();
  }, scaffoldConfig.pollingInterval);

  useEffect(() => {
    const updateQuestionAnswer = async () => {
      if (address) {
        try {
          const response = await fetch(`/api/questions/${id}/answer?address=${address}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();

          console.log("data", data);

          if (response.ok && data !== null) {
            setSelectedOption(data);
          } else {
            notification.error(data.error);
          }
        } catch (e) {
          console.log("Error fetching questions opened", e);
        }
      }
    };
    updateQuestionAnswer();
  }, [id, address]);

  const handleSave = async () => {
    setProcessing(true);
    if (!address) {
      setProcessing(false);
      return;
    }

    if (selectedOption === null || selectedOption === undefined) {
      notification.error("Please select an option");
      setProcessing(false);
      return;
    }

    try {
      // Initialize Web3 provider
      const burnerPK = loadBurnerSK();
      const signer = new ethers.Wallet(burnerPK);

      // Sign the message
      const signature = await signer.signMessage(selectedOption);

      // Post the signed message to the API
      const response = await fetch(`/api/questions/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signature, signerAddress: address, option: selectedOption }),
      });

      console.log("response", response);

      if (response.ok) {
        notification.success("Saved!");
      } else {
        const result = await response.json();
        notification.error(result.error);
      }
    } catch (e) {
      console.log("Error checking in the user", e);
    } finally {
      setProcessing(false);
    }
  };

  if (question === undefined) {
    return (
      <div className="flex flex-col items-center justify-center py-2">
        <div className="max-w-96 p-8">
          <h1 className="text-4xl font-bold">Wrong Question ID!</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="max-w-96 p-8">
        <h1 className="text-4xl font-bold">
          {question && question.question}
          {question && question.value && ` (${question.value})`}
        </h1>
        <h2 className="text-2xl font-bold">{questionStatus === "open" ? "Select your answers..." : "Closed"}</h2>
      </div>
      <div className="flex flex-col pt-2 gap-[100px] md:flex-row">
        <ol>
          {question &&
            question.options.map((option: { text: string }, index: number) => (
              <li key={index}>
                <div
                  className={`flex flex-row items-center p-3 m-3 outline outline-2 outline-black ${
                    selectedOption == (index as unknown as string) ? "bg-primary" : ""
                  } ${questionStatus === "reveal" && questionRightOption === index ? "border-green-500 border-4" : ""}`}
                >
                  <label
                    className={`p-2 ${
                      processing || loadingQuestionStatus || questionStatus !== "open" ? "" : "cursor-pointer"
                    }`}
                  >
                    <input
                      type="radio"
                      name="token"
                      value={index}
                      disabled={processing || loadingQuestionStatus || questionStatus !== "open"}
                      className="w-0 h-0"
                      onChange={t => setSelectedOption(t.target.value)}
                    />
                    <div className="text-lg font-bold">
                      {index + 1}_ {option.text}
                    </div>
                  </label>
                </div>
              </li>
            ))}
        </ol>
      </div>
      <button
        className={`btn btn-primary w-80 mt-4 ${processing || loadingQuestionStatus ? "loading" : ""}`}
        disabled={processing || loadingQuestionStatus || questionStatus !== "open"}
        onClick={handleSave}
      >
        {loadingQuestionStatus ? "..." : "Save"}
      </button>
    </div>
  );
};