import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import firebase_app from "@/firebase/config";
import logo from '../../public/ArquimaLogo.png';
import engrane from '../../public/engranes.gif';
import Image from "next/image";
import { useRouter } from 'next/navigation'

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = React.useState(null);
    const [userUID, setUserUID] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [name, setName] = React.useState('');
    const [cel, setCel] = React.useState('');
    const [rol, setRol] = React.useState('');
    const [currentRol, setCurrentRol] = React.useState(null);
    const [currentName, setCurrentName] = React.useState(null);
    const router = useRouter();

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {  
            if (user) {
                await setUser(user);
                
                await setUserUID(user.uid)
                
                await userDB(); 
                
                router.push("/user-validation")
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user]);

    async function userDB () {
        try {
            const docRef = doc(db, "empleados", userUID)
            const docSnap = await getDoc(docRef)
            const docus = docSnap.data()
            setCurrentRol(docus.rol)
            setCurrentName(docus.nombre)
        } catch (e) {
            console.log(e)
        }
    }

    const changeName = (name) => {
        setName(name)
    }

    const changeCel = (cel) => {
        setCel(cel)
    }

    const changeRol = (rol) => {
        setRol(rol)
    }

    return (
        <AuthContext.Provider value={{ user, name, cel, rol, changeName, changeCel, changeRol, currentRol, userDB, currentName  }}>
            {loading ? 
                <div className="container-sm text-center my-5 align-items-center">
                    <div>
                        <Image className='img-fluid' alt='logo' src={logo} width={600} height={460} />
                    </div>
                    <div>
                        <Image className="img-fluid" alt='engrane' src={engrane} width={350} height={210} />
                        <p>Loading...</p>
                    </div>
                </div> : children}
        </AuthContext.Provider>
    );
};
