
import CloseIcon from "../../components/UI/icons/CloseIcon";
import MaximaIdentity from "../../types/identity";

const renderIcon = (_maximaUser: MaximaIdentity, handleClearDefaultIcon?: () => void, extraClass?: string) => {

    if (!_maximaUser.icon || _maximaUser.icon === '0x00') {
        // DEFAULTS to just the first letter of their name
        return <div className="avatar">{_maximaUser.name.charAt(0).toUpperCase()}</div>;
    }

    const dataImageBase64Regex = /^data:image\/(?:png|jpeg|gif|bmp|webp|svg\+xml);base64,(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    const isBase64 = dataImageBase64Regex.test(decodeURIComponent(_maximaUser.icon));


    if (isBase64) {
        return <div className="relative"> 
                <img className={`avatar ${extraClass && extraClass}`} src={decodeURIComponent(_maximaUser.icon)} alt="user-avatar" />        
                {handleClearDefaultIcon && <div onClick={handleClearDefaultIcon} className={`absolute left-0 right-0 top-0 bottom-0 bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 avatar`}> <CloseIcon fill="red" extraClass="" /> </div>}
            </div> 
    }

    return <div className="avatar">{_maximaUser.name.charAt(0).toUpperCase()}</div>;
};

export default renderIcon;