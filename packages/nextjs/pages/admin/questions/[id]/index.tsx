import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import type { NextPage } from "next";
import QRCode from "react-qr-code";
import { useInterval } from "usehooks-ts";
import { Address } from "~~/components/scaffold-eth";
import { loadBurnerSK } from "~~/hooks/scaffold-eth";
import { useAliases } from "~~/hooks/wallet";
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
  const [questionStatus, setQuestionStatus] = useState<string>("closed");
  const [addressesAnswered, setAddressesAnswered] = useState<string[]>([]);
  const [addressesSuccess, setAddressesSuccess] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);

  const aliases = useAliases({});

  const fetchQuestionData = async () => {
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
        setAddressesAnswered(data.addresses);
      } else {
        notification.error(data.error);
      }
    } catch (e) {
      console.log("Error fetching question data", e);
    } finally {
      setLoadingQuestionData(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (question) {
        await fetchQuestionData();
      }
    })();
  }, [question]);

  useInterval(async () => {
    if (questionStatus !== "reveal") {
      await fetchQuestionData();
    }
  }, scaffoldConfig.pollingInterval);

  const handleChangeStatus = async (newStatus: string) => {
    if (!question) return;

    setProcessing(true);

    type ReqBody = {
      newStatus: string;
      option?: number;
      value?: number;
      signature: string;
    };

    try {
      const burnerPK = loadBurnerSK();
      const signer = new ethers.Wallet(burnerPK);

      const message = JSON.stringify({ action: "question-change-status", questionId: id, status: newStatus });
      const signature = await signer.signMessage(message);
      const bodyData: ReqBody = { newStatus, signature };

      if (newStatus === "reveal") {
        bodyData.option = question.options.findIndex(o => o.ok);
        bodyData.value = question.value;
      }

      const response = await fetch(`/api/admin/questions/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        setQuestionStatus(newStatus);
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

  useEffect(() => {
    const getRightOptionAddresses = async () => {
      if (question && questionStatus === "reveal") {
        try {
          const option = question.options.findIndex(o => o.ok);
          const response = await fetch(`/api/admin/questions/${id}/option/${option}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();

          if (response.ok && data !== null) {
            setAddressesSuccess(data);
          } else {
            notification.error(data.error);
          }
        } catch (e) {
          console.log("Error fetching addresses success", e);
        }
      }
    };
    getRightOptionAddresses();
  }, [id, question, questionStatus]);

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
        <Link href="/admin/questions" className="link link-hover text-sm">
          {"<"} Back to Questions
        </Link>
        <h1 className="text-3xl font-bold">
          {question && question.question}
          {question && question.value && ` (${question.value})`}
        </h1>
        <div>
          {loadingQuestionData && "Loading..."}
          {!loadingQuestionData && (questionStatus === "closed" || questionStatus === null) && (
            <div className="flex flex-col items-center gap-2">
              <div>
                Status: <span className="badge badge-outline">Closed</span>
              </div>
              <button
                className="btn btn-sm btn-primary ml-2 w-1/2"
                disabled={processing}
                onClick={() => handleChangeStatus("open")}
              >
                Open
              </button>
            </div>
          )}
          {!loadingQuestionData && questionStatus === "open" && (
            <div className="flex flex-col items-center gap-2">
              <div>
                Status: <span className="badge badge-outline">Open</span>
              </div>
              <button
                className="btn btn-sm btn-secondary ml-2 w-1/2"
                disabled={processing}
                onClick={() => handleChangeStatus("reveal")}
              >
                Reveal Answer
              </button>
            </div>
          )}
          {!loadingQuestionData && questionStatus === "reveal" && <>Revealed</>}
        </div>
      </div>
      <div className="flex flex-col pt-2 gap-[100px] md:flex-row mb-10">
        <ol>
          {question &&
            question.options.map((option, index) => (
              <li key={index}>
                <div
                  className={`flex flex-row items-center p-3 ${
                    !loadingQuestionData && questionStatus === "reveal" && option.ok ? "bg-success" : ""
                  }`}
                >
                  <div className="w-8 h-8 mr-2 rounded-full bg-gray-200 flex justify-center items-center">
                    {index + 1}
                  </div>
                  <div className="text-lg font-bold">{option.text}</div>
                </div>
              </li>
            ))}
        </ol>
      </div>
      <QRCode size={300} value={`${scaffoldConfig.liveUrl}/questions#${id}`} viewBox="0 0 150 150" />
      <div className="max-w-96 mt-8">
        <h2 className="text-2xl font-bold">
          Responses
          {!loadingQuestionData && questionStatus === "reveal" && (
            <span className="ml-2">
              ({addressesSuccess.length} correct of {addressesAnswered.length})
            </span>
          )}
        </h2>
      </div>
      <div className="flex flex-col gap-[100px] md:flex-row">
        {loadingQuestionData ? (
          "Loading..."
        ) : addressesAnswered.length == 0 ? (
          <div className="text-lg">No responses yet</div>
        ) : (
          <ol>
            {addressesAnswered.map((address, index) => (
              <li
                key={index}
                className={`m-4 p-2 ${
                  questionStatus === "reveal" && addressesSuccess.includes(address) ? "bg-success" : ""
                }`}
              >
                <Address address={address} alias={aliases[address]} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default AdminQuestionShow;
