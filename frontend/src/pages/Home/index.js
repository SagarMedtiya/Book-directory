import styles from './index.module.css'

function Home(userDetails){
    const user = userDetails.user;
    const logout=()=>{
        window.open(
            `${process.env.REACT_APP_URL}/auth/logout`,
            "_self"
        )
    }

    return(
        <div className={styles.container}>
            <div className={styles.form_container}>
                <img className={styles.img} src="./images/profile.jpg" alt="" />
            </div>
            <button className={styles.btn} onClick={logout}>Logout</button>
        </div>
    )
}

export default Home;