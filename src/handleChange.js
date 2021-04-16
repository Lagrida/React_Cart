
export default function handleChange(event, setData){
    const target = event.target;
    if(target.type === "checkbox"){
        setData(d => {
            return {...d, [target.name]: target.checked}
        });
    }else{
        setData(d => {
            return {...d, [target.name]: target.value}
        });
    }
}
