"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang, T } from "./i18n";

// Use a loose Record type so both EN and AM strings are assignable
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyTranslation = any;

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; t: AnyTranslation; }

const LangContext = createContext<LangCtx>({ lang: "en", setLang: () => {}, t: T.en });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("kms_lang") as Lang | null;
    if (stored === "en" || stored === "am") setLangState(stored);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("kms_lang", l);
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: T[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useT() { return useContext(LangContext); }
