import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAnalysis } from '../contexts/AnalysisContext';
import { Globe, Building, Users, Briefcase } from 'lucide-react';

const regions = [
  'North America', 'Europe', 'Asia Pacific', 'Latin America', 
  'Middle East & Africa', 'South Asia'
];

const industries = [
  'Accounting', 'Apparel & Fashion', 'Architecture & Planning', 'Automotive',
  'Building Materials', 'Business Supplies & Equipment', 'Chemicals',
  'Civic & Social Organization', 'Civil Engineering', 'Computer Software',
  'Construction', 'Consumer Goods', 'Consumer Services', 'Design', 'E-Learning',
  'Education Management', 'Electrical/Electronic Manufacturing', 'Entertainment',
  'Environmental Services', 'Events Services', 'Facilities Services', 'Farming',
  'Financial Services', 'Food & Beverages', 'Food Production', 'Furniture',
  'Government Administration', 'Health, Wellness & Fitness', 'Higher Education',
  'Hospitality', 'Hospital & Health Care', 'Human Resources',
  'Individual & Family Services', 'Information Technology & Services', 'Insurance',
  'Internet', 'Investment Management', 'Law Practice', 'Legal Services',
  'Leisure, Travel & Tourism', 'Machinery', 'Management Consulting',
  'Marketing & Advertising', 'Mechanical or Industrial Engineering',
  'Media Production', 'Medical Device', 'Medical Practice', 'Mining & Metals',
  'Motion Pictures & Film', 'Music', 'Non-Profit Organization Management',
  'Oil & Energy', 'Package/Freight Delivery', 'Paper & Forest Products',
  'Performing Arts', 'Photography', 'Plastics', 'Primary/Secondary Education',
  'Professional Training & Coaching', 'Publishing', 'Real Estate',
  'Recreational Facilities & Services', 'Religious Institutions', 'Research',
  'Restaurants', 'Retail', 'Sports', 'Staffing & Recruiting', 'Supermarkets',
  'Telecommunications', 'Textiles', 'Transportation/Trucking/Railroad',
  'Utilities', 'Veterinary', 'Wholesale'
];

const companySizes = [
  '1-50 employees', '51-200 employees', '201-500 employees',
  '501-1000 employees', '1001-5000 employees', '5000+ employees'
];

const departments = [
  'Sales', 'Marketing', 'Operations', 'Finance', 'HR',
  'IT', 'Customer Service', 'R&D', 'Legal', 'Production'
];

function AnalysisForm() {
  const { user, signIn } = useAuth();
  const { performAnalysis, loading } = useAnalysis();
  const [formData, setFormData] = useState({
    region: '',
    industry: '',
    companySize: '',
    department: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      const shouldSignIn = window.confirm('Please sign in to perform analysis. Would you like to sign in now?');
      if (shouldSignIn) {
        signIn();
      }
      return;
    }
    await performAnalysis(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SelectField
          icon={<Globe className="w-5 h-5 text-coral-500" />}
          label="Region"
          name="region"
          value={formData.region}
          onChange={handleChange}
          options={regions}
        />
        <SelectField
          icon={<Building className="w-5 h-5 text-coral-500" />}
          label="Industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          options={industries}
        />
        <SelectField
          icon={<Users className="w-5 h-5 text-coral-500" />}
          label="Company Size"
          name="companySize"
          value={formData.companySize}
          onChange={handleChange}
          options={companySizes}
        />
        <SelectField
          icon={<Briefcase className="w-5 h-5 text-coral-500" />}
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          options={departments}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 px-6 rounded-lg font-dosis font-semibold text-lg
          text-ink bg-paper border-2 border-ink shadow-drawn
          hover:translate-y-[-2px] hover:shadow-drawn-lg
          active:translate-y-[1px] active:shadow-drawn
          transition-all duration-200
          ${loading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {loading ? 'Analyzing...' : 'Generate Analysis'}
      </button>
    </form>
  );
}

function SelectField({ 
  icon, 
  label, 
  name, 
  value, 
  onChange, 
  options 
}: { 
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <div className="bg-white rounded-xl p-6">
      <label className="block text-base font-dosis font-semibold text-ink mb-3">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {icon}
        </div>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="block w-full pl-12 pr-10 py-3 text-ink bg-paper border-2 border-ink 
                   rounded-lg shadow-drawn font-inter
                   focus:outline-none focus:shadow-drawn-lg focus:translate-y-[-2px]
                   transition-all duration-200"
          required
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option} value={option} className="py-2">
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <svg className="w-4 h-4 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default AnalysisForm;