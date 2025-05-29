import React, { useState, useEffect } from "react";
import logoImage from "./assets/logo2.png";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const videos = [
    {
      id: 1,
      title: "가자미근을 자세히 찾아보자!",
      subtitle: "발목 안정성에 핵심인 깊은 종아리 근육",
      embedUrl:
        "https://player.vimeo.com/video/1083232671?h=3dd5a683ed&autoplay=1&loop=0&title=0&byline=0&portrait=0",
    },
    {
      id: 2,
      title: "뒤정강근을 풀어보자!",
      subtitle: "발바닥 아치와 뒤꿈치 통증과 관련 있음",
      embedUrl:
        "https://player.vimeo.com/video/1083232632?h=e9fe6c8e53&autoplay=1&loop=0&title=0&byline=0&portrait=0",
    },
    {
      id: 3,
      title: "장딴지근을 풀어보자!",
      subtitle: "종아리 근육 중 가장 겉에 위치한 근육",
      embedUrl:
        "https://player.vimeo.com/video/1083232651?h=1f8cb550e5&autoplay=1&loop=0&title=0&byline=0&portrait=0",
    },
    {
      id: 4,
      title: "오금근을 풀어보자!",
      subtitle: "무릎 뒤 불편감의 원인이 될 수 있음",
      embedUrl:
        "https://player.vimeo.com/video/1083235449?h=ac78ea7f8d&autoplay=1&loop=0&title=0&byline=0&portrait=0",
    },
    {
      id: 5,
      title: "긴발가락굽힘근을 풀어보자!",
      subtitle: "발가락 관절 가동성과 종아리 압박 개선",
      embedUrl:
        "https://player.vimeo.com/video/1083232591?h=c40e012da1&autoplay=1&loop=0&title=0&byline=0&portrait=0",
    },
    {
      id: 6,
      title: "짧은발가락굽힘근을 풀어보자!",
      subtitle: "발바닥 앞쪽 통증 완화에 도움",
      embedUrl:
        "https://player.vimeo.com/video/1083232657?h=ac617ab6e2&autoplay=1&loop=0&title=0&byline=0&portrait=0",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoClick = (id: number) => {
    setActiveVideo(id === activeVideo ? null : id);
    setCurrentStep(id);
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white font-sans pb-24">
      <main className="pt-10 px-4 flex flex-col items-center">
        {/* 로고 */}
        <div className="mb-6">
          <img
            src={logoImage}
            alt="Logo"
            className="h-20 mx-auto object-contain"
          />
        </div>

        {/* 콘텐츠 */}
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="w-[90%] mb-6 rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="bg-gray-700 h-48 w-full"></div>
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))
        ) : (
          videos.map((video) => (
            <div
              key={video.id}
              className={`w-[90%] mb-6 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 ${
                activeVideo === video.id ? "scale-[1.02]" : "hover:scale-[1.01]"
              }`}
              onClick={() => {
                handleVideoClick(video.id);
                setCurrentStep(video.id);
              }}
            >
              <div className="relative cursor-pointer aspect-video bg-black">
                <iframe
                  src={video.embedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>

                {/* 오버레이 플레이 버튼 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                      activeVideo === video.id ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <i className="fas fa-play text-white text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#1A1A1A]">
                <h3 className="font-semibold text-base mb-1">
                  {video.title}
                </h3>
                {video.subtitle && (
                  <p className="text-sm text-gray-400 mb-2">
                    {video.subtitle}
                  </p>
                )}
                <div className="w-full h-1 bg-[#333333] mt-1 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E74C3C] rounded-full transition-all duration-300"
                    style={{
                      width: activeVideo === video.id ? "45%" : "0%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      {/* 하단 버튼 */}
      <div className="w-full px-10 mt-8">
        <button
          onClick={() => setShowModal(true)}
          className="block w-full bg-gradient-to-r from-pink-500 to-red-500 text-white text-center py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-transform duration-200"
        >
          쉬운 촉진법이 궁금하다면?
        </button>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4">
          <div className="bg-white text-black rounded-xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center leading-relaxed">
              유리한 클래스 친구 추가하고<br />
              <span className="text-pink-600">김선생의 쉬운 촉진법</span>{" "}
              <strong>FINGER POINT</strong> 출간 알람을 받으세요.
            </h2>
            <a
              href="http://pf.kakao.com/_cQfIn/friend"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-yellow-400 text-center text-black font-semibold py-3 mt-4 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              친구추가하고 알람 받기
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
