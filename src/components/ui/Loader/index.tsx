type PageLoaderProps = {
  fullScreen?: boolean;
  spinnerClassName?: string;
};

const PageLoader = ({
  fullScreen = true,
  spinnerClassName = "border-primary",
}: PageLoaderProps) => (
  <div
    className={
      fullScreen
        ? "flex h-screen items-center justify-center"
        : "flex items-center justify-center py-8"
    }
  >
    <div
      className={`h-8 w-8 animate-spin rounded-full border-4 ${spinnerClassName} border-t-transparent`}
    />
  </div>
);

export default PageLoader;
