import { LOADING_MESSAGES } from "@/constants/message";

const LoadingPage = () => {
  const randomIndex = Math.floor(Math.random() * LOADING_MESSAGES.length);
const randomMessage = LOADING_MESSAGES[randomIndex];

  return (
    <div className="max-w-[430px] h-[calc(var(--vh)*100)] mx-auto flex items-center justify-center bg-[var(--bg-secondary)]">
      <div className="flex flex-col">
        <div className="mb-4 animate-float">
          <img src="/logo.svg" alt="온도 로고" className="h-32 w-32 mx-auto" />
        </div>
        <p className="text-lg font-medium text-gray-700 animate-fade-in text-center">
          {randomMessage}
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;