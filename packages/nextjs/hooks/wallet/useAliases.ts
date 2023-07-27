import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import scaffoldConfig from "~~/scaffold.config";

type TAliasesProps = {
  enablePolling?: boolean;
};

/**
 * Get saved aliases
 * @returns aliases: { [key: string]: string } // address => alias
 */
export const useAliases = ({ enablePolling }: TAliasesProps) => {
  const [aliases, setAliases] = useState<{ [key: string]: string }>({});

  const fetchPeopleAlias = async () => {
    try {
      const response = await fetch("/api/alias", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setAliases(data);
      }
    } catch (e) {
      console.log("Error fetching aliases", e);
    }
  };

  useEffect(() => {
    (async () => {
      fetchPeopleAlias();
    })();
  }, []);

  useInterval(
    async () => {
      await fetchPeopleAlias();
    },
    enablePolling ? scaffoldConfig.pollingInterval : null,
  );

  return aliases;
};
