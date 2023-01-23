import { Link, useParams } from "react-router-dom";

const Page404 = ({defPage}) => {
    console.log(useParams());
    return (
        <div className="error-404">
            <p style={{'textAlign': 'center', 'fontSize': '24px', 'marginBottom': '30px', 'color': 'blue'}}>Ошибка, вы перешли на не существующую страницу</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontSize': '18px'}} to={defPage}>Перейти на домашнюю страницу</Link>
        </div>
    )
};
export default Page404;