import { Button } from "@chakra-ui/react";
import { useEffect } from "react";

import { useStarknet } from "context";

const WalletConnect = () => {
    const { account, connected, setConnected, connectBrowserWallet } =
        useStarknet();

    useEffect(() => {
        if (account && account.address.length > 0) {
            setConnected(true);
        }
    }, [account, setConnected, connected]);

    return !connected ? (
        <Button
            ml="4"
            textDecoration="none !important"
            outline="none !important"
            boxShadow="none !important"
            onClick={() => {
                connectBrowserWallet();
            }}
        >
            Connect Parent Wallet
        </Button>
    ) : (
        <Button
            ml="4"
            textDecoration="none !important"
            outline="none !important"
            boxShadow="none !important"
            onClick={() => {
                setConnected(false);
            }}
        >
            {account
                ? `Your Parent wallet : ${account.address.substring(0, 6)}...${account.address.substring(
                    account.address.length - 4
                )} is connected`
                : "No Account"}
        </Button>
    );
};

export default WalletConnect;
