import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="dashboard-layout">
            <header>
                <h1>MALABE POLICE DIVISION</h1>
                <p>Welcome Admin_Officer</p>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;