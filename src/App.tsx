import React from 'react';
import { BarChart3, Building2, Globe2, Users2 } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import { AnalysisProvider } from './contexts/AnalysisContext';
import Navbar from './components/Navbar';
import AnalysisForm from './components/AnalysisForm';
import ResultsDisplay from './components/ResultsDisplay';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    <AuthProvider>
      <AnalysisProvider>
        <div className="min-h-screen bg-paper antialiased">
          <Navbar />
          <main className="container mx-auto px-4 py-12 relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section className="paper-card rounded-2xl overflow-hidden">
                  <div className="coral-gradient p-6 relative overflow-hidden">
                    <h2 className="text-3xl font-handdrawn text-white flex items-center gap-2 relative z-10">
                      CIO Assist
                    </h2>
                    <div className="absolute inset-0 bg-ink opacity-5 pattern-dots"></div>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                      <StatsCard
                        icon={<Globe2 className="w-6 h-6 text-coral-500" />}
                        title="Global Research"
                        value="5+ Regions"
                      />
                      <StatsCard
                        icon={<Building2 className="w-6 h-6 text-coral-600" />}
                        title="Industries"
                        value="50+ Sectors"
                      />
                      <StatsCard
                        icon={<Users2 className="w-6 h-6 text-coral-500" />}
                        title="Company Sizes"
                        value="1-5000+"
                      />
                      <StatsCard
                        icon={<BarChart3 className="w-6 h-6 text-coral-600" />}
                        title="Departments"
                        value="10+ Teams"
                      />
                    </div>
                    <AnalysisForm />
                  </div>
                </section>
                <ResultsDisplay />
              </div>
              <div className="lg:col-span-1">
                <UserDashboard />
              </div>
            </div>
          </main>
        </div>
      </AnalysisProvider>
    </AuthProvider>
  );
}

function StatsCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="paper-card rounded-xl p-4 bg-white transition-all">
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <h3 className="text-sm font-handdrawn text-ink">{title}</h3>
          <p className="text-lg font-semibold text-ink font-outfit">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
