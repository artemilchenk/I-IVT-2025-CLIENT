import { type FC } from "react";
import { CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/Button.tsx";

interface Props {
  title?: string;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmPrompt: FC<Props> = ({
  title = "Confirm delete",
  text,
  onConfirm,
  onCancel,
}: Props) => {
  const onCancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCancel();
  };

  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <CardTitle className="text-xl font-semibold text-center">
        {title}
      </CardTitle>

      <p className="text-center text-base text-muted-foreground mb-2">{text}</p>

      <CardFooter className="flex gap-3 justify-center">
        <Button
          variant="default"
          onClick={onCancelHandler}
          className="px-6 py-2 rounded-xl"
        >
          Cancel
        </Button>
        <Button onClick={onConfirm} className="px-6 py-2 rounded-xl">
          Confirm
        </Button>
      </CardFooter>
    </div>
  );
};
