import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <h1>Main</h1>
            {children}
        </div>
    );
}

export default DashboardLayout;