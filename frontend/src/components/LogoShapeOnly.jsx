import { cn } from "@/lib/utils";

function LogoShapeOnly({ className }) {
  return (
    <div
      className={cn(
        "relative flex size-8 items-center justify-center",
        className,
      )}
    >
      <div className="circle absolute top-[29%] left-[26%] h-[16%] w-[16%] rounded-full bg-[#00a669]" />
      <div className="absolute top-[27%] right-[34%] h-[48%] w-[16%] rotate-30 rounded-full bg-[#00a669]" />
    </div>
  );
}

export default LogoShapeOnly;
