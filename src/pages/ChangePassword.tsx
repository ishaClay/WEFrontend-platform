import { Card } from '@/components/ui/card';
import { useState } from 'react';

function ChangePassword() {
    const [enabled, setEnabled] = useState(false);

    const toggleSwitch = () => {
        setEnabled(!enabled);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center p-4">
            <Card className="bg-white rounded-lg h-auto w-full max-w-[610px]">
                <div className="ml-4 mt-3 text-[20px] font-semibold">
                    <h1>Settings</h1>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className=" md:w-[200px] h-auto md:h-[380px] flex flex-col m-4 gap-4 border-r-0 md:border-r-2 border-[#E4E4E4]">
                        <button className="bg-[#F5F5F5] w-full md:w-[170px] h-[40px] text-[#606060] px-6 py-2 hover:bg-[#00778B] hover:text-white rounded-md">
                            Profile Setting
                        </button>
                        <button className="bg-[#F5F5F5] w-full md:w-[170px] h-[40px] text-[#606060] px-6 py-2 hover:bg-[#00778B] hover:text-white rounded-md">
                            Account Setting
                        </button>
                        <button className="bg-[#F5F5F5] w-full md:w-[170px] h-[40px] text-[#606060] px-6 py-2 hover:bg-[#00778B] hover:text-white rounded-md">
                            Log Out
                        </button>
                    </div>
                    <div className="w-full md:w-auto flex-1">
                        <div className="mt-3 text-[20px] font-semibold">
                            <h1>Change password</h1>
                        </div>
                        <div className="max-w-full md:max-w-md mx-auto border-b-2 pb-4 border-[#E4E4E4] mt-2">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" htmlFor="old-password">
                                    Old password
                                </label>
                                <input
                                    id="old-password"
                                    type="password"
                                    className="appearance-none block w-full md:w-[360px] border border-[#D9D9D9] rounded-md py-2 px-3"
                                    placeholder="Enter old password"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" htmlFor="new-password">
                                    New password
                                </label>
                                <input
                                    id="new-password"
                                    type="password"
                                    className="appearance-none block w-full md:w-[360px] border border-[#D9D9D9] rounded-md py-2 px-3"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" htmlFor="confirm-new-password">
                                    Confirm New password
                                </label>
                                <input
                                    id="confirm-new-password"
                                    type="password"
                                    className="appearance-none block w-full md:w-[360px] border border-[#D9D9D9] rounded-md py-2 px-3"
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <div className="flex justify-center md:justify-start space-x-4">
                                <button className="bg-green-600 w-[100px] h-[40px] text-white py-2 px-4 rounded-md">
                                    Save
                                </button>
                                <button className="bg-red-600 w-[100px] h-[40px] text-white py-2 px-4 rounded-md">
                                    Cancel
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <span className="mr-4 text-lg">Notifications</span>
                            <div
                                className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-300 ml-auto md:ml-[200px] ${enabled ? 'bg-[#00778B]' : 'bg-gray-200'}`}
                                onClick={toggleSwitch}
                            >
                                <span
                                    className={`inline-block h-[15px] w-[16px] transform rounded-full bg-white transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default ChangePassword;
