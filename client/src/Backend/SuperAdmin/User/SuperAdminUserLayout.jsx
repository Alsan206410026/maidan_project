import { NavLink, Outlet } from "react-router-dom";

function SuperAdminUserLayout() {
    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Manage Users
            </h1>

            <div className="flex gap-8 border-b mb-6">

                <NavLink
                    to=""
                    end
                    className={({ isActive }) =>
                        isActive
                            ? "border-b-2 border-blue-600 pb-2 font-semibold text-blue-600"
                            : "pb-2 text-gray-600"
                    }
                >
                    Users
                </NavLink>

                <NavLink
                    to="admins"
                    className={({ isActive }) =>
                        isActive
                            ? "border-b-2 border-blue-600 pb-2 font-semibold text-blue-600"
                            : "pb-2 text-gray-600"
                    }
                >
                    Admins
                </NavLink>

                <NavLink
                    to="super-admins"
                    className={({ isActive }) =>
                        isActive
                            ? "border-b-2 border-blue-600 pb-2 font-semibold text-blue-600"
                            : "pb-2 text-gray-600"
                    }
                >
                    Super Admins
                </NavLink>

            </div>

            {/* Child pages will render here */}
            <Outlet />

        </div>
    );
}

export default SuperAdminUserLayout;