interface ErrorPageProps {
    error: string | null;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center">
          <div className="text-4xl mb-4">😢</div>
          <p className="text-[var(--text-secondary)]">{error}</p>
        </div>
      </div>
    );
};

export default ErrorPage;