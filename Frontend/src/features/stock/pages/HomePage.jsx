function HomePage() {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="mb-24 max-w-md space-y-4 text-center sm:space-y-6">
        <h1 className="text-foreground text-xl font-semibold sm:text-3xl">
          Thinking About It
        </h1>

        {/* Divider line */}
        <div className="bg-primary mx-auto h-0.5 w-14 rounded-full" />

        <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
          We’re exploring the possibility of adding stock investing to Vestify.
          It’s something we’d like to bring if everything fits well.
        </p>

        <p className="text-muted-foreground text-xs italic sm:text-sm">
          Stay tuned
        </p>
      </div>
    </div>
  );
}

export default HomePage;
