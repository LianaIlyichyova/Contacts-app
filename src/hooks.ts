import { useMemo } from "react";
import { IRowDataType } from "./assets/interfaces/intefaces";

export const useContacts = (contacts: any, text: string) => {
  const sortedAndSearchedPosts = useMemo(() => {
    return (
      contacts.length &&
      contacts.filter(
        (contact: IRowDataType) =>
          contact?.phone?.includes(text) ||
          contact?.name?.toLowerCase().includes(text.toLocaleLowerCase())
      )
    );
  }, [text, contacts]);

  return sortedAndSearchedPosts;
};

export const useFetchOptions = (
  method: string,
  contentType: string,
  body?: BodyInit
) => {
  return {
    method: method,
    headers: { "Content-Type": contentType },
    body: body,
  };
};
