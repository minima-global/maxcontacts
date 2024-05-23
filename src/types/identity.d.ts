type MaximaIdentity = {
    name: string;
    icon: string | "0x00"; // 0x00 for no icon
    publickey: string;
    staticmls: boolean;
    mls: string;
    localidentity: string;
    p2pidentity: string;
    contact: string;
    logs: boolean;
    poll: number;
};

export default MaximaIdentity;