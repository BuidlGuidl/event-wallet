import { useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useInterval } from "usehooks-ts";
import { Address } from "~~/components/scaffold-eth";
import untypedQuestions from "~~/questions.json";
import scaffoldConfig from "~~/scaffold.config";
import { Question } from "~~/types/question";
import { notification } from "~~/utils/scaffold-eth";

const AdminQuestionShow: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const questionId: number = parseInt(id as string);

  const question: Question | undefined = untypedQuestions.find(q => q.id === questionId);

  const [loadingQuestionData, setLoadingQuestionData] = useState(true);
  const [questionOpened, setQuestionOpened] = useState<boolean>(false);
  const [addressesAnswered, setAddressesAnswered] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);

  const fetchQuestionData = async () => {
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
        setQuestionOpened(data.open);
        setAddressesAnswered(data.addresses);
      } else {
        notification.error(data.error);
      }
    } catch (e) {
      console.log("Error fetching question opened", e);
    } finally {
      setLoadingQuestionData(false);
    }
  };

  useInterval(async () => {
    await fetchQuestionData();
  }, scaffoldConfig.pollingInterval);

  const handleOpen = async () => {
    setProcessing(true);
    try {
      const response = await fetch(`/api/admin/questions/${id}/open`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setQuestionOpened(true);
        notification.success("Opened!");
      } else {
        const result = await response.json();
        notification.error(result.error);
      }
    } catch (e) {
      console.log("Error opening question", e);
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = async () => {
    setProcessing(true);
    try {
      const response = await fetch(`/api/admin/questions/${id}/close`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setQuestionOpened(false);
        notification.success("Closed!");
      } else {
        const result = await response.json();
        notification.error(result.error);
      }
    } catch (e) {
      console.log("Error closing question", e);
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
        <h2 className="text-2xl font-bold">
          {loadingQuestionData ? (
            "Loading..."
          ) : questionOpened ? (
            <>
              Open
              <button className="btn btn-primary ml-2" disabled={processing} onClick={handleClose}>
                Close
              </button>
            </>
          ) : (
            <>
              Closed
              <button className="btn btn-primary ml-2" disabled={processing} onClick={handleOpen}>
                Open
              </button>
            </>
          )}
        </h2>
      </div>
      <div className="flex flex-col pt-2 gap-[100px] md:flex-row">
        <ol>
          {question &&
            question.options.map((option, index) => (
              <li key={index}>
                <div className="flex flex-row items-center p-3">
                  <div className="w-8 h-8 mr-2 rounded-full bg-gray-200 flex justify-center items-center">
                    {index + 1}
                  </div>
                  <div className="text-lg font-bold">{option.text}</div>
                </div>
              </li>
            ))}
        </ol>
      </div>
      <div className="max-w-96 mt-8">
        <h2 className="text-2xl font-bold">Responses</h2>
      </div>
      <div className="flex flex-col gap-[100px] md:flex-row">
        {loadingQuestionData ? (
          "Loading..."
        ) : addressesAnswered.length == 0 ? (
          <div className="text-lg">No responses yet</div>
        ) : (
          <ol>
            {addressesAnswered.map((address, index) => (
              <li key={index} className="m-4">
                <Address address={address} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default AdminQuestionShow;
