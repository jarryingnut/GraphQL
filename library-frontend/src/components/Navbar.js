import React, {useEffect, useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import {Flex, Box, Spacer, Button, Text, Image, ButtonGroup} from '@chakra-ui/react'
import {useApolloClient, useQuery} from '@apollo/client'
import { ME } from '../queries'


const Navbar = (props) => {   

    const history = useHistory()
    const client = useApolloClient()
    //const [user, setUser] = useState()
    // const usered = useQuery(ME)

    // useEffect(() => {
    //     if(usered.data){
    //         setUser(usered.data?.me?.username)
    //     }
    //   }, [user, usered.data])

    //  useEffect(() => {
    //     if(props.user){
    //         setUser(props.user?.data?.me?.username)
    //     }
    //     else if(props.lazyUser){
    //         setUser(props.lazyUser?.data?.me?.username)
    //     }
    //   }, [props.lazyUser, props.user, user])

    let user = props.lazyUser?.data?.me?.username ? props.lazyUser?.data?.me?.username : props.user?.data?.me?.username

    const handleLogout = async () => {
        props.setToken(null)
        localStorage.clear()
        client.resetStore()
        history.push('/login')
    }

    const handlesignup = () => {
        props.setToken(null)
        localStorage.clear()
        client.resetStore()
        history.push('/signup')
    }

   // if( props.user?.username || props.token){
    if( props.loginResult?.data){
        return (
           
            <Flex  align="center" px="40"  bg="gray.200" py="1.5" color="gray.600" 
            >
                <Box pr="4">
                    <NavLink to="/"><Image w='90px' src='/inread.png' alt='inRead'/></NavLink>
                </Box>
                <Box px="2"> 
                <Text size="sm" fontWeight="semibold" _hover={{ color: 'orange.400' }}><NavLink to="/books" >Books</NavLink></Text>
                </Box>
                <Box px="2"> 
                <Text size="sm" fontWeight="semibold" _hover={{ color: 'orange.400' }}><NavLink to="/authors">Authors</NavLink></Text>
                </Box>
                <Box px="2"> 
                <Text size="sm" fontWeight="semibold" _hover={{ color: 'orange.400' }}><NavLink to="/newbook">Add Book</NavLink></Text>
                </Box>
                <Spacer />
                <Flex  alignItems="center">
                    
                    <Text size="sm" fontWeight="semibold" mr="4">{`${user} logged in `}</Text>
                    
                    <Button px="2" colorScheme="blue" onClick={handleLogout} size="sm" variant="outline" borderRadius="sm">Logout</Button>
                </Flex>
            </Flex>
        )
    } else  {
        return (
        <Flex align="center" px="20"  bg="gray.200" py="1.5">
        <Box  px="2">
        <NavLink to="/"><Image w='90px' src='/inread.png' alt='inread' size="l"/></NavLink>
        </Box>
        <Spacer />
        <ButtonGroup variant="outline" spacing="6" size="sm" colorScheme="telegram" border="none" color="gray.600">
            <Button onClick={handlesignup} borderRadius="sm">
            Sign Up
            </Button>
            <Button onClick={handleLogout} borderRadius="sm">Log in</Button>
        </ButtonGroup>
        </Flex>
        
        )
    }
}

export default Navbar