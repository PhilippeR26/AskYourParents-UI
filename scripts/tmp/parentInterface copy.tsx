// page parentInterface.tsx
import type { NextPage } from 'next'

import useAddrStore from '../context/ContextGlobal/contextGlobal'
import useParentContext from '../context/ContextGlobal/contextParent'
import { useStarknet } from "context";

import { useEffect, useState, useRef } from 'react'

import { Text, Button, Box, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Flex, Spacer } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'



import WalletConnect from 'component/WalletConnect'


const Home: NextPage = () => {
    const adParent = useAddrStore(state => state.AddressParent);
    const [myAdParent, setmyAdParent] = useState<bigint>();
    useEffect(() => { setmyAdParent(adParent) }, [adParent]);

    // UseContext Starknet provider
    const { account, connected, setConnected, connectBrowserWallet } = useStarknet();

    //Zustand context in NextJS : address of children wallet, address of children valid
    const { addressChildren, setAddChild, childWvalid, setChildWvalid } = useParentContext();
    const [myAdChild, setmyAdChild] = useState<string>(addressChildren);
    const [myChildWvalid, setmyChildWvalid] = useState<boolean>(childWvalid);
    useEffect(() => { setmyAdChild(addressChildren) }, [addressChildren]);
    useEffect(() => { setmyChildWvalid(childWvalid) }, [childWvalid]);

    //const isAddrInvalid = (myAdChild.length !== 66) || (myAdChild.substring(0, 2) !== "0x");
    const isAddrInvalid = (myAdChild.length !== 66) || (myAdChild.substring(0, 2) !== "0x");
    const initRef = useRef;

    return (
        <>
            <Box bg="gray.200" w='100%' color='gray.800' borderWidth='1px' overflow='hidden'>
                <Center>
                    <Text fontSize='2xl'>Interface for parent  </Text>
                </Center>

            </Box>
            <Text>Addr Parent = {String(myAdParent)}  </Text>
            <Text>Addr Child local = {myAdChild}  </Text>
            <Text>Addr Child storage = {addressChildren}  </Text>
            <Box w='100%' color='gray.800' overflow='hidden'>
                <Center>
                    <WalletConnect />
                </Center>
                {(connected) ?
                    <>
                        <Center py={5}>
                            <Button ml="4" bg="orange"
                                onClick={() => {
                                    setmyAdChild("");
                                    setAddChild(""); setChildWvalid(false);
                                }}>
                                Reset addr child
                            </Button>
                        </Center>
                        <Center py={5}>
                            {(!myChildWvalid) ?
                                <Popover autoFocus>
                                    <PopoverTrigger>
                                        <Button ml="4" bg="blue.200">
                                            Connect Children Wallet
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent w="680px">
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverBody>
                                            <FormControl isInvalid={isAddrInvalid}>
                                                <FormLabel>Enter children wallet address</FormLabel>
                                                <Input w="100%" placeholder='0x...' value={myAdChild} onChange={(e) => setmyAdChild(e.target.value)}>

                                                </Input>
                                                <FormHelperText>Enter an hexadecimal Starknet testnet address of 64 characters max, with 0x prefix
                                                </FormHelperText>
                                                <FormErrorMessage>
                                                    address not valid.
                                                </FormErrorMessage>
                                            </FormControl>
                                            {!isAddrInvalid && (
                                                <Flex>
                                                    <Spacer />
                                                    <Button leftIcon={<Search2Icon />}>

                                                        {/* Add onClick to ft for check wallet */}
                                                        Verify address of children wallet
                                                    </Button>
                                                </Flex>
                                            )
                                            }
                                        </PopoverBody>

                                    </PopoverContent>
                                </Popover>
                                :
                                <>
                                    {/* If address children if fully validated */}
                                </>
                            }
                        </Center>
                    </>
                    : ""
                }
                <Center py={5}>
                </Center>
            </Box>

        </>

    )
}



export default Home
