const LoadingPage = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">🌡️</div>
          <p className="text-[var(--text-secondary)]">로딩 중...</p>
        </div>
      </div>
    );
};

export default LoadingPage;