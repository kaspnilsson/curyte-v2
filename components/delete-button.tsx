"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Props extends ButtonProps {
  lessonId: string;
  description?: string;
}

const DeleteButton = ({
  lessonId,
  description = "This action cannot be undone.",
  ...props
}: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const onDelete = async () => {
    try {
      const res = await fetch(`/api/lessons/${lessonId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const { data, error } = await res.json();
        if (error) {
          throw new Error(error);
        }
        startTransition(() => {
          // Refresh the current route and fetch new data from the server without
          // losing client-side browser or React state.
          router.refresh();
        });
      }
    } catch (e: unknown) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again: " + e,
      });
      console.error(e);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...props}>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteButton };
