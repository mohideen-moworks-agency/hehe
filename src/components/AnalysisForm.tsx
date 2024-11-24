import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAnalysis } from '../contexts/AnalysisContext';
import { Globe, Building, Users, Briefcase, Brain } from 'lucide-react';
import type { AIModel } from '../lib/models/types';

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

const models: { id: AIModel; name: string; description: string }[] = [
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'Fast and efficient analysis using Mixtral-8x7B'
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Advanced analysis using Claude-3 Opus'
  }
];

function AnalysisForm() {
  const { user, signIn } = useAuth();
  const { performAnalysis, loading } = useAnalysis();
  const [formData, setFormData] = useState({
    region: '',
    industry: '',
    companySize: '',
    department: '',
    model: 'perplexity' as AIModel
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

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="bg-white rounded-lg p-4">
        <label className="block text-sm font-playful font-medium text-ink mb-4">
          Select AI Model
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {models.map(model => (
            <label
              key={model.id}
              className={`relative flex items-start p-4 cursor-pointer rounded-lg border-2 transition-all ${
                formData.model === model.id
                  ? 'border-coral-500 bg-coral-50'
                  : 'border-gray-200 hover:border-coral-200'
              }`}
            >
              <input
                type="radio"
                name="model"
                value={model.id}
                checked={formData.model === model.id}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="flex items-center">
                <Brain className={`w-5 h-5 ${
                  formData.model === model.id ? 'text-coral-500' : 'text-gray-400'
                }`} />
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    formData.model === model.id ? 'text-coral-900' : 'text-gray-900'
                  }`}>
                    {model.name}
                  </p>
                  <p className={`text-sm ${
                    formData.model === model.id ? 'text-coral-700' : 'text-gray-500'
                  }`}>
                    {model.description}
                  </p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`button-handdrawn w-full py-3 px-4 rounded-lg font-playful text-white text-lg
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
    <div className="bg-white rounded-lg p-4">
      <label className="block text-sm font-playful font-medium text-ink mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="appearance-none block w-full pl-10 pr-8 py-2.5 text-ink bg-white 
                   border-2 border-ink rounded-lg font-outfit text-sm
                   focus:outline-none focus:border-coral-500"
          required
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-4 h-4 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default AnalysisForm;