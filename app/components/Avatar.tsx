import classNames from "classnames";

export default function Avatar(props: {
  initials: string;
  variant: "normal" | "highlight" | "ghost" | "small";
}) {
  const { initials } = props;
  const { variant } = props || "normal";
  const extraClasses = {
    normal: "w-10 h-10 bg-green-400 outline-green-600 outline-1",
    highlight: "w-10 h-10 bg-green-400 outline-green-600 outline-4",
    ghost:
      "w-10 h-10 bg-transparent outline-green-600 outline-2 outline-dashed",
    small: "w-8 h-8 bg-green-400 outline-green-600 outline-1 text-xs",
  };
  return (
    <div
      className={classNames(
        "outline rounded-full flex justify-center items-center",
        extraClasses[variant],
      )}
    >
      {initials}
    </div>
  );
}