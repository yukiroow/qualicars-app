import { useEffect, useState } from "react";
import type { AgentObject, StateProps } from "../props/PropInterfaces";
import useApiFetch from "../hooks/useApiFetch";

const ProfileModal = ({ username, setLoading }: StateProps) => {
    const [agentData, setAgentData] = useState<AgentObject>();
    const { getRequest } = useApiFetch();
    useEffect(() => {
        const fetchData = async () => {
            setLoading!(true);
            await getRequest({
                endpoint: `/agents/${username}`,
            })
                .then((data) => {
                    setAgentData(data.responseData!.agent);
                })
                .catch((err) => {
                    setLoading!(false);
                });

            setLoading!(false);
        };

        fetchData();
    }, [username]);
    return (
        <dialog id="profile_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Profile</h3>
                <p className="py-4">
                    Hi there,{" "}
                    <span className="font-bold">{`${agentData?.first_name} ${agentData?.last_name}`}</span>
                    .
                </p>
                <p className="italic">User details</p>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Agent ID</td>
                            <td className="text-primary font-normal">1</td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td className="text-primary font-normal">
                                {username}
                            </td>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td className="text-primary font-normal">
                                {agentData?.first_name}
                            </td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td className="text-primary font-normal">
                                {agentData?.last_name}
                            </td>
                        </tr>
                        <tr>
                            <td>Contact No.</td>
                            <td className="text-primary font-normal">
                                {agentData?.contact}
                            </td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td className="text-primary font-normal">
                                {agentData?.address}
                            </td>
                        </tr>
                        <tr>
                            <td>Date Joined</td>
                            <td className="text-primary font-normal">
                                {!agentData?.date_joined
                                    ? ""
                                    : new Date(
                                          agentData.date_joined,
                                      ).toDateString()}
                            </td>
                        </tr>
                    </thead>
                </table>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default ProfileModal;
