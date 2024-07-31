import IconProfile from "./icon/profil";
interface CardProps {
    icon: string;
    title: string;
    desc: string;
}

const Card = ({ icon, title, desc }: CardProps) => {
    return (
        <div className="flex alignitem max-w-sm rounded overflow-hidden shadow-lg m-3 mt-5 bg-white">
            {/* <img className="w-10 rounded" src={icon} alt={title} /> */}
            <div className=" w-16" style={{  backgroundColor: '#181059' }}></div>
            <div className="flex flex-col px-6 py-4">
                <div className="font-medium text-md">{title}</div>
                <h2 className=" text-lg font-bold text-base">{desc}</h2>
            </div>
        </div>
    );
};

export default Card;
