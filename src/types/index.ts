import { ReactElement } from "react";

export type GuardProps = {
  children: ReactElement | null;
};

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};