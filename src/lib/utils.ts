import { DocType } from "@/signup/enums";
import { CustomFile } from "@/signup/interfaces";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateFilename(
  filename: string,
  firstChars: number,
  lastChars: number
) {
  // Handle empty or very short filenames
  if (!filename || filename.length <= firstChars + lastChars + 1) {
    return filename;
  }

  const middleLength = filename.length - firstChars - lastChars - 1;
  const middle = middleLength > 0 ? "..." : ""; // Ellipsis for truncation

  return `${filename.slice(0, firstChars)}${middle}${filename.slice(
    -lastChars
  )}`;
}

export async function FileToCustomFile(
  file: File,
  type: DocType,
  sellerId: string
): Promise<CustomFile> {
  return {
    refIdDocType: type,
    idSeller: sellerId,
    name: file.name,
    content: await fileToBase64(file),
    contentType: file.type,
  };
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const base64String = reader.result.toString().split(",")[1];
        resolve(base64String);
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const convertToOptions = (data: { id: number; name: string }[]) => {
  return data.map((item) => ({
    value: item.id.toString(),
    label: item.name,
  }));
};

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export const handleDownloadFile = (file: string) => {
  const link = document.createElement("a");
  link.href = file;
  link.download = file.substring(file.lastIndexOf("/") + 1) || "download";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const formatString = (str: string) => {
  if (!str) return "";
  const withSpaces = str.replace(/_/g, " ");
  if (withSpaces.length === 0) {
    return "";
  }
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};

export const getInitials = (fullName: string): string => {
  if (!fullName) return "";
  const nameParts = fullName.split(" ").filter((part) => part.trim() !== "");
  let initials = nameParts.map((part) => part[0]?.toUpperCase() || "").join("");
  return initials;
};
