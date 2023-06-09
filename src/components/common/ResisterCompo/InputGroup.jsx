import Input from "./Input";
import Box from "./Box";
import Label from "./Label"
import AlertMessage from "./AlertMessage";
import DoubleCheck from "./DoubleCheck";


const InputGroup = ({ id, name, type, value, onChange, label, placeholder, para, doublecheck, margin }) => {

    return (
        <Box>
            <Label htmlFor={id} child={label} margin={margin}></Label>
            <Input id={id} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
            <AlertMessage para={para}></AlertMessage>
        </Box>
    )
}


export default InputGroup;