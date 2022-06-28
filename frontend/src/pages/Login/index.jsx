import styles from './index.module.css'

function Login(){
    const googleAuth=()=>{
        window.open(
            `${process.env.REACT_APP_URL}/auth/google/callback`,
            "_self"
        )
    }

    return(
        <div className={styles.container}>
            <button className={styles.google_btn} onClick={googleAuth}>
                <img src="./images/Google.png" alt="" />
                <span>Sign In with Google</span>
            </button>
        </div>
    )
}

export default Login;