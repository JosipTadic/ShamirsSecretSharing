import  { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  type: string,
  value: number | string,
}

const Input: FC<InputProps>
= props => {
  if(props.value == null || "") props.value = "0";
  return <input {...props} />;
};

/*export const InputComp = (Props) => {
  return(
    <input type={Props.type} value={Props.value} min={Props.min} max={Props.max}
    onChange={(e) => Props.onChange()} />
  )
}*/

export default Input