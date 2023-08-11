import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { useAccount } from "wagmi";
import { BurnerSigner } from "~~/components/scaffold-eth/BurnerSigner";
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

  const message = {
    action: "question-answer",
    questionId: id,
    option: selectedOption,
  };

  const fetchQuestionStatus = async () => {
    try {
      const response = await fetch(`/api/questions/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

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
    if (questionStatus !== "reveal") {
      await fetchQuestionStatus();
    }
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

          if (response.ok) {
            const data = await response.json();
            setSelectedOption(data);
          }
        } catch (e) {
          console.log("Error fetching questions opened", e);
        }
      }
    };
    updateQuestionAnswer();
  }, [id, address]);

  const handleSave = async ({ signature }: { signature: string }) => {
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
      <div className="max-w-96 p-8 pb-4">
        <h1 className="text-3xl font-bold text-center">
          {question && question.question}
          {question && question.value && ` (${question.value})`}
        </h1>
      </div>
      <div className="flex flex-col pt-2 gap-[100px] md:flex-row">
        <ol>
          {question &&
            question.options.map((option: { text: string }, index: number) => (
              <li key={index}>
                <div
                  className={`flex flex-row items-center m-3 border border-gray-300 outline-black ${
                    selectedOption == (index as unknown as string) ? "bg-secondary" : ""
                  } ${questionStatus === "reveal" && questionRightOption === index ? "bg-success" : ""}`}
                >
                  <label
                    className={`p-6 w-full flex ${
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
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-2 rounded-full bg-gray-200 flex justify-center items-center">
                        {index + 1}
                      </div>
                      <span>{option.text}</span>
                    </div>
                  </label>
                </div>
              </li>
            ))}
        </ol>
      </div>
      <BurnerSigner
        className={`btn btn-primary w-80 mt-4 ${processing || loadingQuestionStatus ? "loading" : ""}`}
        disabled={processing || loadingQuestionStatus || questionStatus !== "open"}
        message={message}
        handleSignature={handleSave}
      >
        {loadingQuestionStatus ? "..." : "Send Answer"}
      </BurnerSigner>
    </div>
  );
};
