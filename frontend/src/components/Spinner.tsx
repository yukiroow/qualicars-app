const Spinner = () => {
    return (
        <>
            <div className="flex justify-center align-middle absolute w-screen h-screen top-0 left-0 bg-base-300 z-10 opacity-50">
                <span className="loading loading-ring loading-xl z-20"></span>
            </div>
        </>
    );
};

export default Spinner;
