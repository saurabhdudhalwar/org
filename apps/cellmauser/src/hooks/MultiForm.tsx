import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface Props {
  forms: ReactElement[];
}

type MultiFormState = {
  step: number;
  data: any;
  goTo: (step: number) => void;
  forward: () => void;
  back: () => void;
  setDataForNextForm: (data: any) => void;
};

const initialState: MultiFormState = {
  step: 0,
  data: {},
  goTo: () => {},
  forward: () => {},
  back: () => {},
  setDataForNextForm: () => {},
};

const MultiFormContext = createContext(initialState);

const MultiForm: React.FC<Props> = (props: Props) => {
  const [step, setStep] = useState<number>(0);
  const [data, setData] = useState<object>({});
  const elements = props.forms;

  const goTo = (theStep: number) => {
    setStep(theStep);
  };

  const forward = useCallback(() => {
    setStep((i) => {
      if (i >= elements.length - 1) return i;
      return i + 1;
    });
  }, [elements.length]);

  const back = () => {
    setStep((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const setDataForNextForm = useCallback(
    (dataToBeSent: any) => {
      setData({ ...data, ...dataToBeSent });
    },
    [data]
  );

  const state: MultiFormState = useMemo(() => {
    return {
      step,
      goTo,
      forward,
      back,
      data,
      setDataForNextForm,
    };
  }, [step, forward, data, setDataForNextForm]);

  return (
    <MultiFormContext.Provider value={state}>
      {elements[step]}
    </MultiFormContext.Provider>
  );
};

export default MultiForm;

export const useMultiFormContext = () => {
  const context = useContext(MultiFormContext);
  if (context === undefined) return initialState;
  return context;
};
