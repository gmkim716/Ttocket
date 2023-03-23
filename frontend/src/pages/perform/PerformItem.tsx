import { Link } from "react-router-dom";
import axiosApi from "../../services/axiosApi";
import formatDate from "../../components/date/formatDate";
import checkEndDate from "../../components/date/checkEndDate";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface performDataType {
  desc: string;
  end_time: string;
  etc: string;
  id: number;
  location: string;
  max_seats: number;
  poster: string;
  price: number;
  start_time: string;
  title: string;
  user_id: string;
}

function PerformItem() {
  const location = useLocation();
  const navigate = useNavigate();

  //userID 나중에는 리덕스로 가져올 예정
  const userId = "0x29E247A3ac74F466a2acb85C7Abf2F086A4759b3";

  // 정보 받은거 내용
  const [isLike, setIsLike] = useState<boolean>(false);
  const [performData, setPerformData] = useState<performDataType>();

  //예매버튼 확인용
  let todayTime = new Date();

  //뒤로가기 버튼
  const handleGoBack = () => {
    navigate(-1);
  };

  //페이지 뜰 때 데이터 받아오기
  const performDataHandler = async () => {
    try {
      const res = await axiosApi.get(
        `performance/${userId}/${location.state}`,
        {
          headers: {},
        }
      );
      console.log(res);
      setIsLike(res.data.body.is_user_like);
      setPerformData(res.data.body.performance_dto);
    } catch (err) {
      console.log(err);
    }
  };

  //좋아요 버튼 누르기 통신
  const isLikeHandler = async () => {
    try {
      const res = await axiosApi.put(
        `performance/like/${userId}/${location.state}`
      );
      setIsLike(res.data.body);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    performDataHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col content-center mt-16 h-screen">
      <div className="flex h-14 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
          onClick={handleGoBack}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        <p onClick={handleGoBack}>돌아가기</p>
      </div>
      <div className="overflow-scroll">
        {performData && (
          <div>
            <img
              src={performData.poster}
              alt="backposter"
              className="relative h-96 w-full blur-md"
            ></img>
            <div className="w-full flex justify-center">
              <img
                src={performData.poster}
                alt="poster"
                className="h-80 w-72 object-center absolute top-40"
              ></img>
            </div>
          </div>
        )}
        <div className="p-2">
          <p className="font-bold text-2xl my-3">{performData?.title}</p>
          <hr className="bg-gray-400 my-4"></hr>
          <p className="flex justify-between ">
            <span className="mr-2">
              {performData?.end_time.slice(0, 10)} |{" "}
              {performData?.end_time.slice(11, 16)}시
            </span>
            <span className="text-right text-gray-500 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                  clipRule="evenodd"
                />
              </svg>
              {performData?.location}
            </span>
          </p>
          {/* <p className="font-bold flex justify-end">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1292/1292744.png"
            alt="coin"
            className="h-6 mr-1"
          ></img>
          {performData?.price} COIN
        </p> */}

          <p className="mt-8 mb-2 text-lg font-bold">공연 상세</p>
          <p>{performData?.desc}</p>
        </div>
      </div>
      <div className="flex absolute bottom-0" onClick={isLikeHandler}>
        {isLike ? (
          <p className="mr-4 ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-9 h-9 text-ttokPink"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </p>
        ) : (
          <p className="mr-4 ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-9 h-9 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </p>
        )}
        {performData &&
        checkEndDate(
          performData.start_time.slice(0, 10),
          formatDate(todayTime)
        ) ? (
          <Link to="/reserve/" state={location.state}>
            <button className="bg-gray-300 text-white w-72 h-10 rounded font-bold">
              {performData.start_time.slice(0, 10)}{" "}
              {performData?.end_time.slice(11, 16)}시 오픈 예정
            </button>
          </Link>
        ) : (
          <Link to="/reserve/" state={location.state}>
            <button className="bg-[#FB7185] text-white w-72 h-10 rounded font-bold">
              예매하기
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default PerformItem;
