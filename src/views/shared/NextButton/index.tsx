import {Link} from "react-router-dom";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {Button} from "antd";
import './style.scss';

const NextButton = ({redirectRoute}: any) => {
    const route = redirectRoute || -1
    return (
        <Link to={route as any}>
            <Button className='next-button'>
                <ArrowLeftOutlined className='icon'/>
            </Button>
        </Link>
    )
}

export default NextButton;
