import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, RefreshCw, ExternalLink, Video, FileText, Award, DollarSign, HelpCircle, Zap, Database, ArrowLeft, Download, Mail, Share2, CheckCircle, Info, TrendingUp, Users } from 'lucide-react';
import salesforceLogo from './salesforce-logo.png';

const DecisionTree = () => {
  // Add Salesforce Sans font
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://www.sfdcstatic.com/system/shared/common/assets/fonts/SalesforceSans/SalesforceSans.css');
      
      .salesforce-font * {
        font-family: 'Salesforce Sans', Arial, sans-serif !important;
      }
    `;
    document.head.appendChild(style);
    
    // Sticky CTA scroll detection
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.head.removeChild(style);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [step, setStep] = useState('start');
  const [sel, setSel] = useState({});
  const [multi, setMulti] = useState({});
  const [history, setHistory] = useState(['start']);
  const [companyName, setCompanyName] = useState('');
  const [showCompanyInput, setShowCompanyInput] = useState(true);
  const [discoveryChecklist, setDiscoveryChecklist] = useState({});
  const [showTooltip, setShowTooltip] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const resultsRef = useRef(null);

  // Tool/product logos mapping (using emoji for now, can be replaced with actual logos)
  const toolLogos = {
    'Google': '🔵',
    'Microsoft': '🟦',
    'Slack': '💬',
    'Shopify': '🛍️',
    'HubSpot': '🧡',
    'Zendesk': '💚',
    'Snowflake': '❄️',
    'BigQuery': '🔷',
    'Redshift': '🔴',
    'Databricks': '🔶',
    'S3': '📦',
    'Azure': '☁️'
  };

  // Customer logo placeholders (can be replaced with actual logo URLs)
  const customerLogos = {
    'Retail': ['🏪 Target', '🛒 Walmart', '👕 Gap'],
    'Professional Services': ['💼 Deloitte', '📊 Accenture', '⚖️ Baker McKenzie'],
    'Healthcare': ['🏥 Kaiser', '💊 CVS Health', '🩺 Mayo Clinic'],
    'Manufacturing': ['🏭 3M', '🔧 Stanley B&D', '⚙️ Honeywell'],
    'Financial Services': ['🏦 JPMorgan', '💳 AmEx', '📈 Morgan Stanley']
  };

  // Tooltips for technical terms
  const tooltips = {
    'Zero Copy': 'Access data where it lives without moving or duplicating it. Reduces costs and latency while maintaining security.',
    'Atlas Reasoning Engine': 'Advanced AI system that enables autonomous decision-making for agents. Powers hybrid reasoning combining rules and machine learning.',
    'Agent Script': 'Low-code scripting language for building sophisticated agent workflows. Enables complex autonomous behaviors.',
    'MuleSoft Agent Fabric': 'Integration layer that orchestrates workflows across all your systems. Connects agents to any application or data source.',
    'Customer 360': 'Unified view of each customer across all touchpoints - sales, service, marketing, commerce. Single source of truth.',
    'Data Lakehouse': 'Modern architecture combining data lake flexibility with data warehouse performance. Handles structured and unstructured data.',
    'Agentic Enterprise': 'Organization where AI agents and humans collaborate seamlessly. Autonomous agents handle routine work while humans focus on strategy.',
    'Trust Layer': 'Built-in security, privacy, and compliance controls. Ensures agents operate within guardrails and maintain data governance.'
  };

  const customerStories = {
    // Existing stories
    'Internal Salesforce': 'https://www.salesforce.com/news/stories/agentforce-salesforce-productivity/',
    'Wiley Publishing': 'https://www.salesforce.com/news/stories/wiley-customer-success/',
    'Fisher & Paykel': 'https://www.salesforce.com/news/stories/fisher-paykel-digital-transformation/',
    'Stanley Black & Decker': 'https://www.salesforce.com/news/stories/stanley-black-decker-innovation/',
    'Wayfair': 'https://www.salesforce.com/news/stories/wayfair-data-cloud/',
    'OpenTable': 'https://www.salesforce.com/news/stories/opentable-service-cloud/',
    
    // Healthcare
    'Kaiser': 'https://www.salesforce.com/customer-success-stories/kaiser-permanente/',
    'CVS Health': 'https://www.salesforce.com/customer-success-stories/cvs-health/',
    'Mayo Clinic': 'https://www.salesforce.com/customer-success-stories/mayo-clinic/',
    
    // Retail
    'Target': 'https://www.salesforce.com/customer-success-stories/target/',
    'Walmart': 'https://www.salesforce.com/customer-success-stories/walmart/',
    'Gap': 'https://www.salesforce.com/customer-success-stories/gap/',
    
    // Manufacturing
    '3M': 'https://www.salesforce.com/customer-success-stories/3m/',
    'Stanley B&D': 'https://www.salesforce.com/news/stories/stanley-black-decker-innovation/',
    'Honeywell': 'https://www.salesforce.com/customer-success-stories/honeywell/',
    
    // Financial Services
    'JPMorgan': 'https://www.salesforce.com/customer-success-stories/jpmorgan-chase/',
    'AmEx': 'https://www.salesforce.com/customer-success-stories/american-express/',
    'Morgan Stanley': 'https://www.salesforce.com/customer-success-stories/morgan-stanley/',
    
    // Professional Services
    'Deloitte': 'https://www.salesforce.com/customer-success-stories/deloitte/',
    'Accenture': 'https://www.salesforce.com/customer-success-stories/accenture/',
    'Baker McKenzie': 'https://www.salesforce.com/customer-success-stories/'
  };
  
  // Helper function to get story URL from company name
  const getCompanyStoryURL = (companyName) => {
    // Remove emoji and trim
    const cleanName = companyName.replace(/[^\w\s&]/g, '').trim();
    // Check for exact match or partial match
    for (const [key, url] of Object.entries(customerStories)) {
      if (cleanName.includes(key) || key.includes(cleanName)) {
        return url;
      }
    }
    // Fallback to general customer stories page
    return 'https://www.salesforce.com/customer-success-stories/';
  };

  const techTooltips = {
    'Zero Copy': 'Access data where it lives without duplicating or moving it. Eliminates expensive ETL pipelines and keeps storage costs low while enabling real-time analytics.',
    'Atlas Reasoning Engine': 'Salesforce\'s advanced AI engine that powers autonomous decision-making in agents. Uses hybrid reasoning combining rules and ML for reliable, explainable AI.',
    'Agent Script': 'Low-code language for building sophisticated agent workflows. Enables agents to execute complex multi-step tasks autonomously without human intervention.',
    'MuleSoft Agent Fabric': 'Integration layer that connects agents to any system via APIs. Orchestrates workflows across your entire tech stack automatically.',
    'Customer 360': 'Unified view of each customer across all systems and touchpoints. Single source of truth that powers personalized experiences.',
    'Data Lakehouse': 'Modern architecture combining data lake flexibility with data warehouse performance. Handles structured and unstructured data at petabyte scale.',
    'Agentic Revolution': 'The industry shift from AI assistants that suggest to autonomous agents that execute. 88% of AI projects fail without this transformation.',
    'Trust Layer': 'Enterprise-grade security, compliance, and governance built into every Agentforce interaction. Ensures AI operates within your policies.'
  };

  const flow = {
    start: { 
      q: "What best describes your organization?", 
      subtitle: "Welcome to the Agentic Revolution",
      opts: [
        { label: "Current Salesforce Customer", next: 'sf_products' }, 
        { label: "Not Using Salesforce", next: 'industry' }
      ] 
    },
    sf_products: { 
      q: "Which Agentforce products do you use?", 
      subtitle: "Select all that apply",
      multi: true, 
      opts: [
        { label: "Agentforce Sales", value: "Agentforce Sales", icon: '📈' }, 
        { label: "Agentforce Service", value: "Agentforce Service", icon: '🎧' }, 
        { label: "Agentforce Marketing", value: "Agentforce Marketing", icon: '📧' },
        { label: "Agentforce Commerce", value: "Agentforce Commerce", icon: '🛍️' },
        { label: "Agentforce Revenue", value: "Agentforce Revenue", icon: '💰' }
      ], 
      next: 'industry' 
    },
    industry: { 
      q: "What industry are you in?", 
      opts: [
        { label: "Retail", next: 'retail_check', icon: '🛒' }, 
        { label: "Professional Services", next: 'role', icon: '💼' }, 
        { label: "Healthcare", next: 'role', icon: '🏥' }, 
        { label: "Manufacturing", next: 'role', icon: '🏭' }, 
        { label: "Financial Services", next: 'role', icon: '🏦' }
      ] 
    },
    retail_check: { 
      q: "Interested in data collaboration with partners?", 
      subtitle: "Media networks, suppliers, or other data sharing", 
      opts: [
        { label: "Yes - Share data with partners", next: 'retail_collab' }, 
        { label: "No - Internal use only", next: 'role' }
      ] 
    },
    retail_collab: { 
      q: "What type of data collaboration?", 
      opts: [
        { label: "Retail Media Network", next: 'retail_media' }, 
        { label: "Supplier/Vendor collaboration", next: 'retail_supplier' }, 
        { label: "Both", next: 'retail_both' }
      ] 
    },
    retail_media: { 
      q: "Do you have first-party customer data?", 
      opts: [
        { label: "Yes - Rich customer data", next: 'retail_media_audience' }, 
        { label: "Some customer data", next: 'retail_media_audience' }, 
        { label: "Limited", next: 'role' }
      ] 
    },
    retail_media_audience: { 
      q: "What's your primary goal?", 
      opts: [
        { label: "Monetize customer data", next: 'retail_media_result' }, 
        { label: "Improve advertising ROI", next: 'retail_media_result' }, 
        { label: "Both", next: 'retail_media_result' }
      ] 
    },
    retail_supplier: { 
      q: "What data do you want to share with suppliers?", 
      opts: [
        { label: "Sales performance", next: 'retail_supplier_result' }, 
        { label: "Inventory and demand", next: 'retail_supplier_result' }, 
        { label: "Customer insights", next: 'retail_supplier_result' }
      ] 
    },
    retail_both: { 
      q: "Which is higher priority?", 
      opts: [
        { label: "Media Network first", next: 'retail_media_result' }, 
        { label: "Supplier collaboration first", next: 'retail_supplier_result' }, 
        { label: "Equal priority", next: 'retail_media_result' }
      ] 
    },
    retail_media_result: { type: 'clean_room', subtype: 'media' },
    retail_supplier_result: { type: 'clean_room', subtype: 'supplier' },
    role: { 
      q: "What's your primary role?", 
      opts: [
        { label: "Sales", next: 'tools', icon: '📈' }, 
        { label: "Customer Service", next: 'tools', icon: '🎧' }, 
        { label: "Marketing", next: 'tools', icon: '📧' }, 
        { label: "Operations", next: 'tools', icon: '⚙️' }
      ] 
    },
    tools: { 
      q: "What tools do you use daily?", 
      subtitle: "Select all that apply",
      multi: true, 
      opts: [
        { label: "Google Workspace", value: "Google", icon: toolLogos['Google'] }, 
        { label: "Microsoft 365", value: "Microsoft", icon: toolLogos['Microsoft'] }, 
        { label: "Slack", value: "Slack", icon: toolLogos['Slack'] }, 
        { label: "Shopify", value: "Shopify", icon: toolLogos['Shopify'] },
        { label: "HubSpot", value: "HubSpot", icon: toolLogos['HubSpot'] },
        { label: "Zendesk", value: "Zendesk", icon: toolLogos['Zendesk'] }
      ], 
      next: 'data_warehouse' 
    },
    data_warehouse: { 
      q: "Do you have a data warehouse, lake, or lakehouse?", 
      subtitle: "Where you store and analyze data",
      multi: true, 
      opts: [
        { label: "Snowflake", value: "Snowflake", icon: toolLogos['Snowflake'] }, 
        { label: "BigQuery", value: "BigQuery", icon: toolLogos['BigQuery'] }, 
        { label: "Redshift", value: "Redshift", icon: toolLogos['Redshift'] }, 
        { label: "Databricks", value: "Databricks", icon: toolLogos['Databricks'] }, 
        { label: "AWS S3 Data Lake", value: "S3", icon: toolLogos['S3'] }, 
        { label: "Azure Data Lake", value: "Azure", icon: toolLogos['Azure'] }, 
        { label: "None", value: "None", icon: '❌' }
      ], 
      next: 'data_type' 
    },
    data_type: { 
      q: "What type of data do you primarily work with?", 
      opts: [
        { label: "Structured (databases, spreadsheets)", next: 'data_status' }, 
        { label: "Mix of structured and unstructured", next: 'data_status' }, 
        { label: "Unstructured (documents, emails)", next: 'data_status' }
      ] 
    },
    data_status: { 
      q: "How would you describe your data management?", 
      opts: [
        { label: "Single source of truth", next: 'quality' }, 
        { label: "Scattered across systems", next: 'manual' }, 
        { label: "Mostly manual processes", next: 'manual' }
      ] 
    },
    quality: { 
      q: "How's your data quality?", 
      opts: [
        { label: "Clean and accurate", next: 'ai_exp' }, 
        { label: "Has quality issues", next: 'manual' }
      ] 
    },
    manual: { 
      q: "What manual tasks take up most of your time?", 
      subtitle: "Select all that apply",
      multi: true, 
      opts: [
        { label: "Data entry", value: "entry" }, 
        { label: "Follow-ups", value: "followup" }, 
        { label: "Reports", value: "reports" },
        { label: "Email campaigns", value: "campaigns" }
      ], 
      next: 'time' 
    },
    time: { 
      q: "How many hours per week do you spend on these tasks?", 
      opts: [
        { label: "10+ hours", next: 'ai_exp' }, 
        { label: "5-10 hours", next: 'ai_exp' }, 
        { label: "Under 5 hours", next: 'ai_exp' }
      ] 
    },
    ai_exp: { 
      q: "Have you used AI tools before?", 
      opts: [
        { label: "Yes, extensively", next: 'team' }, 
        { label: "Some experimentation", next: 'team' }, 
        { label: "No, new to AI", next: 'team' }
      ] 
    },
    team: { 
      q: "What's your team size?", 
      opts: [
        { label: "1-5 people", next: 'use_case' }, 
        { label: "6-20 people", next: 'use_case' }, 
        { label: "21-50 people", next: 'use_case' }, 
        { label: "50+ people", next: 'use_case' }
      ] 
    },
    use_case: { 
      q: "Where would AI agents have the biggest impact?", 
      opts: [
        { label: "Lead generation & qualification", next: 'result' }, 
        { label: "Customer service & support", next: 'result' }, 
        { label: "Marketing campaigns", next: 'result' }, 
        { label: "Analytics & reporting", next: 'result' }
      ] 
    }
  };

  const handleNext = (value, nextStep) => {
    const curr = flow[step];
    if (curr?.multi) {
      const current = multi[step] || [];
      setMulti({ ...multi, [step]: current.includes(value) ? current.filter(v => v !== value) : [...current, value] });
    } else {
      setSel({ ...sel, [step]: value });
      if (nextStep) {
        setStep(nextStep);
        setHistory([...history, nextStep]);
      }
    }
  };

  const confirmMulti = () => {
    const nextStep = flow[step]?.next;
    if (nextStep) {
      setStep(nextStep);
      setHistory([...history, nextStep]);
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const prevStep = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setStep(prevStep);
    }
  };

  const reset = () => {
    setStep('start');
    setSel({});
    setMulti({});
    setHistory(['start']);
    setDiscoveryChecklist({});
  };

  const toggleDiscovery = (recIdx, qIdx) => {
    const key = `${recIdx}-${qIdx}`;
    setDiscoveryChecklist({ ...discoveryChecklist, [key]: !discoveryChecklist[key] });
  };

  const shareResults = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Results link copied to clipboard!');
  };

  const emailResults = () => {
    const subject = encodeURIComponent(`${companyName ? companyName + ' - ' : ''}Agentforce 360 Strategy`);
    const body = encodeURIComponent('Here is my personalized Agentforce 360 strategy: ' + window.location.href);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const downloadPDF = () => {
    // This would integrate with a PDF generation library in production
    alert('PDF download functionality would be implemented here with a library like jsPDF or similar');
  };

  const Tooltip = ({ term, children }) => (
    <span className="relative inline-block">
      <span
        className="cursor-help border-b border-dotted border-blue-600 text-blue-600"
        onMouseEnter={() => setShowTooltip(term)}
        onMouseLeave={() => setShowTooltip(null)}
      >
        {children}
        <Info className="w-3 h-3 inline ml-1" />
      </span>
      {showTooltip === term && (
        <div className="absolute z-50 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl -top-2 left-0 transform -translate-y-full">
          {tooltips[term]}
          <div className="absolute w-3 h-3 bg-gray-900 transform rotate-45 -bottom-1 left-4"></div>
        </div>
      )}
    </span>
  );

  const ComparisonSlider = ({ before, after, metric }) => {
    const [position, setPosition] = useState(50);
    return (
      <div className="my-4">
        <div className="flex justify-between text-sm font-semibold mb-2">
          <span className="text-red-600">Before: {before}</span>
          <span className="text-green-600">After: {after}</span>
        </div>
        <div className="relative h-12 bg-gradient-to-r from-red-100 via-yellow-100 to-green-100 rounded-lg overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-green-500 opacity-30 transition-all"
            style={{ width: `${position}%` }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-1 h-full bg-gray-800"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-800 flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-gray-600 mt-2">{metric}</p>
      </div>
    );
  };

  const ROICalculator = ({ hrs, teamCount, sav }) => {
    const [customHrs, setCustomHrs] = useState(hrs);
    const [customTeam, setCustomTeam] = useState(teamCount);
    const calculatedSavings = Math.round(customHrs * customTeam * 52 * 50 * 0.7);

    return (
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 my-4">
        <h4 className="font-semibold text-blue-900 mb-3">💰 Interactive ROI Calculator</h4>
        <div className="grid md:grid-cols-2 gap-4 mb-3">
          <div>
            <label className="text-sm text-gray-700 block mb-1">Hours per week:</label>
            <input
              type="number"
              value={customHrs}
              onChange={(e) => setCustomHrs(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              min="1"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 block mb-1">Team size:</label>
            <input
              type="number"
              value={customTeam}
              onChange={(e) => setCustomTeam(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              min="1"
            />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">Estimated Annual Savings</p>
          <p className="text-3xl font-bold text-green-600">${calculatedSavings.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{customHrs * customTeam * 52} hours saved per year</p>
        </div>
      </div>
    );
  };

  const getResults = () => {
    const isSF = sel.start?.includes('Current');
    const sfProds = multi.sf_products || [];
    const tools = multi.tools || [];
    const warehouse = multi.data_warehouse || [];
    const hasWarehouse = warehouse.length > 0 && !warehouse.includes('None');
    const ind = Object.values(sel).find(s => s?.includes('Retail') || s?.includes('Professional') || s?.includes('Healthcare') || s?.includes('Manufacturing') || s?.includes('Financial')) || 'Services';
    const role = Object.values(sel).find(s => s?.includes('Sales') || s?.includes('Service') || s?.includes('Marketing') || s?.includes('Operations')) || 'Sales';
    const dataType = Object.values(sel).find(s => s?.includes('Structured') || s?.includes('Mix') || s?.includes('Unstructured'));
    const hasUnstruct = dataType?.includes('Unstructured') || dataType?.includes('Mix');
    const dataStatus = Object.values(sel).find(s => s?.includes('Single') || s?.includes('Scattered') || s?.includes('Manual'));
    const qual = Object.values(sel).find(s => s?.includes('Clean') || s?.includes('Issues'));
    const time = Object.values(sel).find(s => s?.includes('10+') || s?.includes('5-10'));
    const teamSize = Object.values(sel).find(s => s?.includes('1-5') || s?.includes('6-20') || s?.includes('21-50') || s?.includes('50+'));
    const useCase = Object.values(sel).find(s => s?.includes('Lead') || s?.includes('service') || s?.includes('Marketing') || s?.includes('Analytics'));
    
    const curr = flow[step];
    const isCleanRoomFlow = curr?.type === 'clean_room';
    
    const isAdv = dataStatus?.includes('Single') && qual?.includes('Clean');
    const highTime = time?.includes('10+');
    let teamCount = 10;
    if (teamSize?.includes('1-5')) teamCount = 3;
    else if (teamSize?.includes('6-20')) teamCount = 12;
    else if (teamSize?.includes('21-50')) teamCount = 35;
    else if (teamSize?.includes('50+')) teamCount = 75;
    const hrs = highTime ? 12 : 7;
    const sav = Math.round(hrs * teamCount * 52 * 50 * 0.7);
    
    // Get similar companies count
    const similarCompanies = Math.floor(Math.random() * 50) + 150; // Mock data: 150-200 companies
    
    const recs = [];

    // Data 360 recommendation
    if (!isAdv) {
      recs.push({
        priority: "FOUNDATION",
        timeline: "Weeks 1-4",
        stage: "Foundation",
        product: "Data 36O",
        icon: "🏗️",
        subtitle: "The foundation of the Agentic Enterprise",
        tagline: "Zero Copy Data Lakehouse powers autonomous agents with trusted AI",
        story: { 
          company: "Wayfair", 
          result: "Unified Customer 360 across all touchpoints",
          url: "https://www.salesforce.com/customer-success-stories/wayfair/",
          video: "https://www.youtube.com/watch?v=example" // Mock video URL
        },
        socialProof: {
          count: similarCompanies,
          segment: `${ind} companies`
        },
        problem: {
          title: "Data Fragmentation Problem",
          desc: "Team wastes " + hrs + " hrs/week across " + tools.length + " disconnected systems. The average business uses 976 applications, creating 976 versions of one customer when only one Customer 360 will do. This is the Agentic Divide - 88% of AI projects fail without unified data.",
          impacts: [
            hrs * teamCount + " hrs/week on data tasks",
            "Incomplete Customer 360 view across " + tools.length + " systems",
            "Agentic Divide: 88% of AI projects fail without unified data",
            "976 app silos creating 976 customer versions"
          ]
        },
        comparison: {
          metric: "Data Quality & Accessibility",
          before: "40% accuracy, 2+ day delays",
          after: "95%+ accuracy, real-time access"
        },
        solution: {
          title: "Data 36O: Unified Data Lakehouse",
          desc: "Data 36O is your Zero Copy Data Lakehouse foundation for the Agentic Revolution - unifying structured, semi-structured, and unstructured data to power autonomous agents with trusted AI.",
          techAdvantage: "Built on Zero Copy architecture with real-time harmonization. Unlike Snowflake's expensive compute or Databricks' complex setup, Data 36O provides turnkey lakehouse with native Agentforce integration.",
          comps: [
            { 
              name: "Zero Copy Data Lakehouse Architecture", 
              term: "Data Lakehouse",
              does: "Data 36O functions as a modern Zero Copy lakehouse combining low-cost flexible storage with data management and governance. Handles petabytes across structured (CRM), semi-structured (JSON, XML), and unstructured (emails, documents) formats." + (hasWarehouse ? " Integrates with your existing " + warehouse.filter(w => w !== 'None').join('/') + " using open protocols - no rip and replace." : "")
            },
            { 
              name: "Zero Copy Integration", 
              term: "Zero Copy",
              does: "Access data where it lives" + (hasWarehouse ? " including your " + warehouse.filter(w => w !== 'None').join('/') : "") + " without duplication. Separates storage from compute - scale independently. No ETL pipelines required."
            },
            { 
              name: "Identity Resolution Engine", 
              term: "Customer 360",
              does: "Probabilistic matching identifies same customer across " + tools.length + " systems using multiple identifiers: email, name, birthday, contact keys, lead IDs, subscriber keys, system IDs. Resolves inconsistencies with 95%+ accuracy. Creates unified Customer 360 profiles."
            }
          ]
        },
        metrics: { 
          time: Math.round(hrs * teamCount * 0.8) + " hrs/week saved", 
          cost: "$" + Math.round(sav * 0.3).toLocaleString() + "/year saved", 
          efficiency: "80% less data entry", 
          quality: "95%+ Customer 360 accuracy"
        },
        roiCalc: { hrs, teamCount, sav },
        discovery: [
          "Where is your data located? List ALL sources (spreadsheets, S3, Salesforce, databases, etc.)",
          "Do you have an asset inventory documenting each data source?",
          "How do you identify individuals across systems? (email, name, birthday, system IDs?)",
          "What data is shared across systems? Are they consistent?",
          "Data quality in each source: What's missing? Are there duplicates?",
          "What's your process for keeping customer data in sync today?"
        ],
        contact: {
          title: "Data 36O Solutions Architect",
          specialty: "Data unification & lakehouse architecture"
        },
        pricing: {
          model: "Profile-based + consumption",
          range: "Starting at $2,000/month for SMB",
          note: "Pricing scales with data volume and usage"
        }
      });
    }

    // Agent recommendation based on use case
    let agent = null;
    if (useCase?.includes('Lead')) {
      agent = {
        name: 'Agentforce Sales',
        subtitle: 'SDR Agent',
        icon: '🤖',
        stage: "Agent",
        tagline: "Autonomous prospecting workforce, not sales assistants",
        story: { 
          company: "Internal Salesforce", 
          result: "35% sales productivity increase with 1,000+ agents deployed",
          url: "https://www.salesforce.com/agentforce/",
          video: "https://www.youtube.com/watch?v=example"
        },
        socialProof: {
          count: similarCompanies + 50,
          segment: `${ind} ${role} teams`
        },
        problem: { 
          title: "Speed-to-Lead Gap", 
          desc: "Reps spend " + hrs + " hrs/week on manual prospecting. Microsoft Copilot suggests email improvements; Agentforce Sales SDR Agent autonomously qualifies, nurtures, and books meetings 24/7 using Atlas Reasoning Engine.", 
          impacts: [
            teamCount * hrs + " hrs/week lost to manual outreach",
            (teamCount * 20) + " missed leads/month",
            "Microsoft Copilot suggests → Agentforce executes",
            "Manual follow-up delays hurt conversion"
          ]
        },
        comparison: {
          metric: "Lead Response Time & Volume",
          before: "4-8 hours, 50% contacted",
          after: "5 minutes, 100% contacted"
        },
        solution: {
          title: "Agentforce Sales: Autonomous Lead Qualification",
          desc: "Agentforce Sales SDR agent operates 24/7 to autonomously research, qualify, and engage leads. Built on trusted AI with the Atlas Reasoning Engine for hybrid decision-making.",
          techAdvantage: "Built on Atlas Reasoning Engine with Agent Script for sophisticated autonomous workflows. Unlike Microsoft Copilot or HubSpot AI that only suggest actions, Agentforce SDR executes complete qualification workflows autonomously.",
          comps: [
            { 
              name: "Agentforce SDR Core", 
              term: "Atlas Reasoning Engine",
              does: "Autonomous agent powered by Atlas Reasoning Engine. Monitors all lead sources in real-time and makes independent qualification decisions without human intervention. Executes tasks using Agent Script vs Microsoft Copilot which only suggests actions." 
            },
            { 
              name: "Data 36O Customer 360", 
              term: "Customer 360",
              does: "Accesses unified Customer 360 data from " + tools.join(', ') + " via Data 36O Zero Copy lakehouse. Pulls firmographic data, past interactions, website behavior, email engagement, deal history to build complete context for intelligent outreach." 
            },
            { 
              name: "Natural Language Generation", 
              does: "Agent writes personalized outreach using Customer 360 insights. References specific pain points from past interactions, mentions relevant case studies, asks contextual questions. Each email is unique and conversational, not templated." 
            }
          ]
        },
        metrics: { 
          volume: teamCount * 150 + " leads/month handled", 
          quality: "40-60% more qualified", 
          speed: "100% in 5 minutes", 
          time: Math.round(hrs * teamCount * 0.75) + " hrs/week saved"
        },
        roiCalc: { hrs, teamCount, sav },
        discovery: [
          "Current monthly lead volume and sources?",
          "What percentage contacted within 24 hours currently?",
          "Lead qualification criteria (BANT/MEDDIC/custom)?",
          "Current lead-to-opportunity conversion rate?",
          "How do you identify leads across systems?",
          "What lead data is scattered that SDR Agent should access?"
        ],
        contact: {
          title: "Agentforce Sales Specialist",
          specialty: "Sales automation & lead qualification"
        },
        pricing: {
          model: "Per-conversation pricing",
          range: "$2 per conversation",
          note: "Volume discounts available"
        }
      };
    } else if (useCase?.includes('service')) {
      agent = {
        name: 'Agentforce Service',
        subtitle: 'Service Agent',
        icon: '🎧',
        stage: "Agent",
        tagline: "Autonomous case resolution, not service assistants",
        story: { 
          company: "Wiley Publishing", 
          result: "40% faster resolution with autonomous service agents",
          url: "https://www.salesforce.com/customer-success-stories/wiley/",
          video: "https://www.youtube.com/watch?v=example"
        },
        socialProof: {
          count: similarCompanies + 30,
          segment: `${ind} service teams`
        },
        problem: { 
          title: "Service Volume Gap", 
          desc: "Team handles " + (teamCount * 50) + " cases/week. Zendesk AI suggests responses; Agentforce Service autonomously resolves Tier 1 cases across all channels using Atlas Reasoning Engine.", 
          impacts: [
            (teamCount * 50) + " cases/week volume",
            hrs + " hrs/week on repetitive tier 1 issues",
            "60%+ cases are automatable tier 1",
            "Zendesk/Copilot suggest → Agentforce resolves"
          ]
        },
        comparison: {
          metric: "Case Resolution Time & Rate",
          before: "4-8 hours, agents overloaded",
          after: "< 1 minute, 50-70% autonomous"
        },
        solution: {
          title: "Agentforce Service: Autonomous Support",
          desc: "Agentforce Service agent provides 24/7 autonomous support, resolving 50-70% of tier-1 issues without human intervention using Atlas Reasoning Engine.",
          techAdvantage: "Atlas Reasoning Engine enables true autonomous decision-making with Agent Script workflows. Unlike Zendesk AI or Microsoft Copilot that suggest responses, Agentforce Service executes end-to-end resolution autonomously.",
          comps: [
            { 
              name: "Agentforce Service Core", 
              term: "Agent Script",
              does: "Autonomous agent with Atlas Reasoning Engine operates across email, chat, SMS, web 24/7. Handles unlimited concurrent conversations. Makes independent resolution decisions using Agent Script." 
            },
            { 
              name: "Data 36O Customer 360", 
              term: "Customer 360",
              does: "Accesses complete Customer 360 history from " + tools.join(', ') + " via Zero Copy lakehouse. Order history, past tickets, product usage, billing instantly available." 
            },
            { 
              name: "Autonomous Resolution", 
              term: "MuleSoft Agent Fabric",
              does: "For tier-1 issues, agent takes actions automatically via MuleSoft Agent Fabric: resets passwords, looks up orders, processes returns, updates accounts - all without human intervention." 
            }
          ]
        },
        metrics: { 
          volume: teamCount * 500 + " tickets/month", 
          resolution: "50-70% autonomous", 
          speed: "90% < 1 minute", 
          time: Math.round(hrs * teamCount * 0.6) + " hrs/week saved"
        },
        roiCalc: { hrs, teamCount, sav },
        discovery: [
          "Monthly ticket volume across all channels?",
          "What percentage are tier-1 vs complex?",
          "Top 10 most frequent customer inquiries?",
          "Current first response time SLA?",
          "Where is support data located?",
          "How do you identify customers across channels?"
        ],
        contact: {
          title: "Agentforce Service Specialist",
          specialty: "Customer service automation"
        },
        pricing: {
          model: "Per-conversation pricing",
          range: "$1 per conversation",
          note: "Unlimited agent capacity"
        }
      };
    } else if (useCase?.includes('Marketing')) {
      agent = {
        name: 'Agentforce Marketing',
        subtitle: 'Campaign Agent',
        icon: '📧',
        stage: "Agent",
        tagline: "Autonomous campaign execution, not marketing assistants",
        story: { 
          company: "Fisher & Paykel", 
          result: "33% increase in order conversion with agentic personalization",
          url: "https://www.salesforce.com/customer-success-stories/fisher-paykel/",
          video: "https://www.youtube.com/watch?v=example"
        },
        socialProof: {
          count: similarCompanies + 20,
          segment: `${ind} marketing teams`
        },
        problem: { 
          title: "Campaign Execution Gap", 
          desc: "Team spends " + hrs + " hrs/week on manual campaign work. Adobe Marketo AI suggests optimizations; Agentforce Marketing autonomously creates, executes, and optimizes campaigns.", 
          impacts: [
            teamCount * hrs + " hrs/week on execution",
            "2-3 weeks to launch campaigns",
            "Limited personalization at scale",
            "Adobe/HubSpot assistants suggest → Agentforce executes"
          ]
        },
        comparison: {
          metric: "Campaign Launch Speed & Engagement",
          before: "2-3 weeks, 2% conversion",
          after: "Hours, 5-8% conversion"
        },
        solution: {
          title: "Agentforce Marketing: Autonomous Campaigns",
          desc: "Agentforce Marketing agent automates end-to-end campaign creation, segmentation, personalization, and optimization using Atlas Reasoning Engine.",
          techAdvantage: "Atlas Reasoning Engine powers truly autonomous campaigns that adapt in real-time. Unlike Adobe or HubSpot assistants, Agentforce Marketing executes complete campaigns autonomously.",
          comps: [
            { 
              name: "Agentforce Marketing Core", 
              term: "Atlas Reasoning Engine",
              does: "Autonomous agent that plans, creates, and optimizes campaigns without manual intervention. Powered by Atlas Reasoning Engine for intelligent decision-making at scale." 
            },
            { 
              name: "Data 36O Audience Builder", 
              term: "Zero Copy",
              does: "Accesses unified Customer 360 data across " + tools.length + " systems via Data 36O Zero Copy lakehouse. Segments update in real-time based on behavior." 
            },
            { 
              name: "Generative Content Engine", 
              does: "AI generates personalized email content for each segment using Customer 360 context. Creates subject lines, body copy, recommendations based on purchase history." 
            }
          ]
        },
        metrics: { 
          speed: "Hours vs weeks", 
          engagement: "35-50% higher opens", 
          time: Math.round(hrs * teamCount * 0.65) + " hrs/week saved"
        },
        roiCalc: { hrs, teamCount, sav },
        discovery: [
          "How many campaigns per month?",
          "Average time from concept to launch?",
          "Current open and click rates?",
          "How do you segment audiences?",
          "Where is marketing data located?",
          "What Customer 360 data do you need for personalization?"
        ],
        contact: {
          title: "Agentforce Marketing Specialist",
          specialty: "Marketing automation & personalization"
        },
        pricing: {
          model: "Contact-based pricing",
          range: "Starting at $1,000/month",
          note: "Scales with contact volume"
        }
      };
    } else {
      agent = {
        name: 'Tableau + Data 36O',
        subtitle: 'Agentic Analytics',
        icon: '📊',
        stage: "Agent",
        tagline: "Real-time agentic analytics, not static reporting",
        story: { 
          company: "Stanley Black & Decker", 
          result: "Real-time operational visibility",
          url: "https://www.salesforce.com/customer-success-stories/stanley-black-decker/",
          video: "https://www.youtube.com/watch?v=example"
        },
        socialProof: {
          count: similarCompanies,
          segment: `${ind} operations teams`
        },
        problem: { 
          title: "Business Intelligence Gap", 
          desc: "Teams spend " + hrs + " hrs/week creating reports from " + tools.length + " systems. Power BI requires manual refreshes; Data 36O + Tableau provides real-time insights.", 
          impacts: [
            teamCount * hrs + " hrs/week on reporting",
            "Outdated data for decisions",
            "Power BI manual vs Data 36O real-time",
            "Static reports vs agentic insights"
          ]
        },
        comparison: {
          metric: "Report Generation & Data Freshness",
          before: "2-4 hours, day-old data",
          after: "Minutes, real-time data"
        },
        solution: {
          title: "Tableau Next + Data 36O: Agentic Analytics",
          desc: "Tableau Next powered by Data 36O Zero Copy lakehouse provides real-time analytics with AI-powered insights and natural language queries.",
          techAdvantage: "Tableau Next with Atlas Reasoning Engine provides agentic analytics - ask in natural language, get autonomous insights. Data 36O Zero Copy eliminates ETL delays.",
          comps: [
            { 
              name: "Data 36O Integration", 
              term: "Zero Copy",
              does: "Connects Tableau to unified Zero Copy lakehouse spanning " + tools.length + " systems. No ETL - real-time federated queries." 
            },
            { 
              name: "AI-Powered Discovery", 
              term: "Atlas Reasoning Engine",
              does: "AI powered by Atlas Reasoning Engine automatically surfaces insights without manual exploration. Identifies drivers, anomalies, trends." 
            },
            { 
              name: "Natural Language Interface", 
              does: "Type questions in English: 'What were sales by region last quarter?' Tableau interprets intent, generates visualization, delivers answers instantly." 
            }
          ]
        },
        metrics: { 
          speed: "Real-time vs batch", 
          accuracy: "99%+ unified data", 
          time: Math.round(hrs * teamCount * 0.7) + " hrs/week saved"
        },
        roiCalc: { hrs, teamCount, sav },
        discovery: [
          "What reports do you create most frequently?",
          "Average time to generate reports?",
          "Critical data systems for reporting?",
          "Which KPIs do you track?",
          "Where is business data located?",
          "How do you reconcile IDs across systems?"
        ],
        contact: {
          title: "Tableau + Data 36O Specialist",
          specialty: "Business intelligence & analytics"
        },
        pricing: {
          model: "User-based licensing",
          range: "$70/user/month (Creator), $42/user/month (Explorer)",
          note: "Plus Data 36O lakehouse costs"
        }
      };
    }

    if (agent) {
      recs.push({ 
        priority: isAdv ? "AUTONOMOUS AGENT" : "AGENT DEPLOYMENT", 
        timeline: isAdv ? "Weeks 1-3" : "Weeks 5-8", 
        ...agent 
      });
    }

    const resources = [
      { title: "Agentforce 360 Demo", url: "https://www.salesforce.com/form/demo/agentforce-demo/", icon: <Video className="w-4 h-4" /> },
      { title: "Data 36O Documentation", url: "https://help.salesforce.com/s/articleView?id=sf.c360_a_intro.htm", icon: <FileText className="w-4 h-4" /> },
      { title: "Agentic Enterprise Guide", url: "https://www.salesforce.com/resources/guides/agentic-enterprise/", icon: <FileText className="w-4 h-4" /> },
      { title: "Atlas Reasoning Engine", url: "https://www.salesforce.com/artificial-intelligence/atlas-reasoning-engine/", icon: <Zap className="w-4 h-4" /> }
    ];

    // Get customer logos for this industry
    const logos = customerLogos[ind] || customerLogos['Professional Services'];

    return { 
      title: companyName ? `${companyName}'s Agentic Enterprise Strategy` : "Your Agentic Enterprise Strategy", 
      subtitle: isSF ? "Enhance your Salesforce investment with Agentforce 360" : "Transform into an Agentic Enterprise",
      recs, 
      resources,
      logos,
      industry: ind,
      role: role
    };
  };

  const curr = flow[step];
  const isResult = step === 'result';
  const results = isResult ? getResults() : null;

  // Progress calculation
  const totalSteps = 12;
  const currentProgress = history.length - 1;
  const progressPercent = (currentProgress / totalSteps) * 100;

  // Stage indicator
  const getStage = () => {
    if (currentProgress <= 4) return { label: 'Discovery', color: 'blue' };
    if (currentProgress <= 8) return { label: 'Assessment', color: 'purple' };
    if (currentProgress <= 12) return { label: 'Planning', color: 'green' };
    return { label: 'Results', color: 'indigo' };
  };
  const stage = getStage();

  if (isResult) {
    return (
      <div ref={resultsRef} className="salesforce-font min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
        {/* Sticky CTA Button */}
        {showStickyCTA && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50 p-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="hidden md:block">
                <p className="font-bold text-gray-900">Ready to transform {companyName || 'your business'}?</p>
                <p className="text-sm text-gray-600">Schedule your strategy call today</p>
              </div>
              <a
                href={`https://calendar.google.com/calendar/appointments/schedules/AcZssZ1234?prefill_name=${encodeURIComponent(companyName || 'Your Company')}`}
                target="_blank"
                rel="noopener"
                style={{ backgroundColor: '#0176D3' }}
                className="text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-lg whitespace-nowrap"
              >
                🚀 Schedule Your Call
              </a>
            </div>
          </div>
        )}

        <div className="max-w-5xl mx-auto">
          {/* Header with Share Options */}
          <div className="text-center mb-8">
            <div style={{ backgroundColor: '#0176D3' }} className="inline-block text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
              Welcome to the Agentic Revolution
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              🎉 {companyName ? `${companyName}, You're` : "You're"} Ready to Lead the Agentic Revolution
            </h1>
            <p className="text-xl text-gray-600 mb-4 font-medium">Here's your personalized transformation roadmap</p>
            
            {/* Share/Save Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Download PDF</span>
              </button>
              <button
                onClick={emailResults}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Email Results</span>
              </button>
              <button
                onClick={shareResults}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">Share Link</span>
              </button>
            </div>

            {/* Social Proof - Customer Logos */}
            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
              <p className="text-sm text-gray-600 mb-2">Trusted by leading {results.industry} companies:</p>
              <div className="flex flex-wrap justify-center gap-4">
                {results.logos.map((logo, i) => (
                  <a
                    key={i}
                    href={getCompanyStoryURL(logo)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer border-2 border-transparent hover:border-blue-300 shadow-sm hover:shadow-md"
                    title={`See ${logo.replace(/[^\w\s&]/g, '').trim()}'s success story`}
                  >
                    {logo}
                  </a>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Click any company to see their success story →
              </p>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🗺️ Your Agentic Transformation Journey</h3>
            <div className="flex items-center justify-between">
              {results.recs.map((rec, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    idx === 0 ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {rec.icon}
                  </div>
                  <div className="text-xs font-semibold text-gray-700 mt-2">{rec.stage || rec.priority}</div>
                  <div className="text-xs text-gray-500">{rec.timeline}</div>
                  {idx < results.recs.length - 1 && (
                    <div className="absolute left-1/2 top-6 w-full h-0.5 bg-gray-300 -z-10" style={{ width: 'calc(100% / ' + results.recs.length + ')' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-6 mb-8">
            {results.recs.map((rec, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                {/* Priority Badge */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{rec.icon}</div>
                  <div className="flex-1">
                    <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                      {rec.priority} {rec.timeline && `• ${rec.timeline}`}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{rec.name || rec.product}</h2>
                    {rec.subtitle && <p className="text-lg font-semibold text-blue-800 mt-1">{rec.subtitle}</p>}
                    {rec.tagline && <p className="text-sm text-blue-700 mt-1">{rec.tagline}</p>}
                  </div>
                </div>

                {/* Social Proof */}
                {rec.socialProof && (
                  <div className="bg-purple-50 rounded-lg p-3 mb-4 border border-purple-200">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-purple-900">
                        {rec.socialProof.count}+ {rec.socialProof.segment} chose this solution
                      </span>
                    </div>
                  </div>
                )}

                {/* Customer Story with Link and Video */}
                {rec.story && (
                  <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <span className="font-semibold text-gray-900">Trailblazer Success Story:</span>
                          <span className="text-gray-700">{rec.story.company}</span>
                          <span className="text-green-600 font-semibold">→ {rec.story.result}</span>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={rec.story.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-green-700 hover:text-green-900 font-medium"
                          >
                            <FileText className="w-3 h-3" />
                            Read Case Study
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          {rec.story.video && (
                            <a
                              href={rec.story.video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-green-700 hover:text-green-900 font-medium"
                            >
                              <Video className="w-3 h-3" />
                              Watch Video
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Problem */}
                <div className="bg-red-50 rounded-lg p-4 mb-6 border border-red-200">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-red-500">⚠️</span> {rec.problem.title}
                  </h3>
                  <p className="text-gray-700 mb-3">{rec.problem.desc}</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {rec.problem.impacts.map((impact, i) => (
                      <div key={i} className="text-sm text-gray-600 bg-white rounded px-3 py-2">
                        • {impact}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparison Slider */}
                {rec.comparison && (
                  <ComparisonSlider 
                    before={rec.comparison.before}
                    after={rec.comparison.after}
                    metric={rec.comparison.metric}
                  />
                )}

                {/* Solution with Tooltips */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{rec.solution.title}</h3>
                  <p className="text-gray-700 mb-4">{rec.solution.desc}</p>
                  
                  {rec.solution.techAdvantage && (
                    <div className="bg-indigo-50 rounded-lg p-4 mb-4 border border-indigo-200">
                      <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" /> Technical Advantage
                      </h4>
                      <p className="text-sm text-indigo-800">{rec.solution.techAdvantage}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {rec.solution.comps?.map((comp, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {comp.name}
                          {comp.term && (
                            <Tooltip term={comp.term}>
                              <span className="ml-2 text-blue-600 text-sm">ⓘ</span>
                            </Tooltip>
                          )}
                        </h4>
                        <p className="text-sm text-gray-700">{comp.does}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">📊 Expected Business Impact</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.entries(rec.metrics).map(([key, value]) => (
                      <div key={key} className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-600 uppercase mb-1">{key.replace(/_/g, ' ')}</p>
                        <p className="text-lg font-bold text-blue-600">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive ROI Calculator */}
                {rec.roiCalc && (
                  <ROICalculator 
                    hrs={rec.roiCalc.hrs}
                    teamCount={rec.roiCalc.teamCount}
                    sav={rec.roiCalc.sav}
                  />
                )}

                {/* Discovery Questions as Checklist */}
                {rec.discovery && (
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 mb-6">
                    <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" /> Discovery Checklist
                    </h4>
                    <div className="space-y-2">
                      {rec.discovery.map((q, i) => (
                        <label key={i} className="flex items-start gap-3 text-sm text-yellow-800 cursor-pointer hover:bg-yellow-100 p-2 rounded transition-colors">
                          <input
                            type="checkbox"
                            checked={discoveryChecklist[`${idx}-${i}`] || false}
                            onChange={() => toggleDiscovery(idx, i)}
                            className="mt-1 w-4 h-4 text-blue-600 rounded"
                          />
                          <span className={discoveryChecklist[`${idx}-${i}`] ? 'line-through' : ''}>{q}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact & Pricing */}
                <div className="grid md:grid-cols-2 gap-4">
                  {rec.contact && (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">👤 Your Specialist</h4>
                      <p className="text-sm font-medium text-blue-800">{rec.contact.title}</p>
                      <p className="text-xs text-blue-700">{rec.contact.specialty}</p>
                    </div>
                  )}
                  {rec.pricing && (
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2">💵 Pricing Model</h4>
                      <p className="text-sm font-medium text-green-800">{rec.pricing.model}</p>
                      <p className="text-xs text-green-700">{rec.pricing.range}</p>
                      <p className="text-xs text-green-600 mt-1">{rec.pricing.note}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* What Happens Next - 30 Day Timeline */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-2 border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">📋 What Happens Next?</h3>
            <p className="text-center text-gray-700 mb-6">Your next 30 days to transformation</p>
            
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div style={{ backgroundColor: '#0176D3' }} className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 mx-auto">
                  1
                </div>
                <h4 className="font-bold text-gray-900 text-center mb-2">Week 1</h4>
                <p className="text-sm text-gray-700 text-center">Book strategy call with {results.contactType}</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <div style={{ backgroundColor: '#0176D3' }} className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 mx-auto">
                  2
                </div>
                <h4 className="font-bold text-gray-900 text-center mb-2">Week 2</h4>
                <p className="text-sm text-gray-700 text-center">Technical validation workshop</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <div style={{ backgroundColor: '#0176D3' }} className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 mx-auto">
                  3
                </div>
                <h4 className="font-bold text-gray-900 text-center mb-2">Week 3</h4>
                <p className="text-sm text-gray-700 text-center">Pilot scoping & use case validation</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <div style={{ backgroundColor: '#0176D3' }} className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 mx-auto">
                  4
                </div>
                <h4 className="font-bold text-gray-900 text-center mb-2">Week 4</h4>
                <p className="text-sm text-gray-700 text-center">Contract & kickoff</p>
              </div>
            </div>

            <div className="text-center">
              <a
                href={`https://calendar.google.com/calendar/appointments/schedules/AcZssZ1234?prefill_name=${encodeURIComponent(companyName || 'Your Company')}`}
                target="_blank"
                rel="noopener"
                style={{ backgroundColor: '#0176D3' }}
                className="inline-block text-white font-bold py-4 px-8 rounded-lg hover:opacity-90 transition-all text-lg shadow-xl"
              >
                🚀 Schedule Your Strategy Call Now
              </a>
              <p className="text-xs text-gray-600 mt-3">Free consultation • No commitment required</p>
            </div>
          </div>

          {/* Platform Architecture */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-blue-600" />
              Platform Architecture
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-1">
                  <Tooltip term="Trust Layer">Trust Layer</Tooltip>
                </h4>
                <p className="text-sm text-gray-600">Enterprise-grade security and compliance built in</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-1">
                  <Tooltip term="MuleSoft Agent Fabric">MuleSoft Agent Fabric</Tooltip>
                </h4>
                <p className="text-sm text-gray-600">Orchestrates workflows across all systems</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-1">
                  <Tooltip term="Atlas Reasoning Engine">Atlas Reasoning Engine</Tooltip>
                </h4>
                <p className="text-sm text-gray-600">Advanced AI reasoning for autonomous agents</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-1">Slack - Agentic OS</h4>
                <p className="text-sm text-gray-600">Human-agent collaboration at $15/user vs Microsoft $38.55/user</p>
              </div>
            </div>
          </div>

          {/* Dreamforce Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white text-center mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4">🎪</div>
              <h3 className="text-3xl font-bold mb-3">Join Us at Dreamforce 2026</h3>
              <p className="text-xl mb-2">{companyName ? `${companyName}, you're` : "You're"} building your Agentforce strategy</p>
              <p className="text-lg mb-6 text-blue-100">
                Meet the team, see live demos, and connect with 40,000 Trailblazers building the future
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl mb-2">🎯</div>
                  <p className="font-semibold">Agentforce Theater</p>
                  <p className="text-sm text-blue-100">Live demos all week</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl mb-2">🤝</div>
                  <p className="font-semibold">Trailblazer Connect</p>
                  <p className="text-sm text-blue-100">Network with peers</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl mb-2">🏆</div>
                  <p className="font-semibold">Innovation Awards</p>
                  <p className="text-sm text-blue-100">See what's possible</p>
                </div>
              </div>
              <a
                href="https://www.salesforce.com/dreamforce/"
                target="_blank"
                rel="noopener"
                className="inline-block bg-white text-purple-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all shadow-xl text-lg"
              >
                Register for Dreamforce →
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Resources</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {results.resources.map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  {res.icon}
                  <span className="font-medium text-blue-900">{res.title}</span>
                  <ExternalLink className="w-4 h-4 ml-auto text-blue-600" />
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ backgroundColor: '#0176D3' }} className="rounded-2xl p-8 text-white text-center mb-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-4">🚀 Ready to Start Your Agentic Transformation?</h3>
            <p className="mb-6">Connect with a Salesforce expert to begin your journey</p>
            <a
              href="https://www.salesforce.com/form/contact/contactme/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0176D3' }}
              className="inline-block bg-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Schedule Your Strategy Session →
            </a>
          </div>

          {/* Reset */}
          <button
            onClick={reset}
            className="w-full text-gray-600 hover:text-gray-900 py-2 text-sm flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Start Over
          </button>
        </div>
      </div>
    );
  }

  // Company name input screen
  if (showCompanyInput && step === 'start') {
    return (
      <div className="salesforce-font min-h-screen p-4 md:p-8 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #032d60 0%, #0176d3 100%)' }}>
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="mb-4 flex justify-center">
                <img 
                  src={salesforceLogo} 
                  alt="Salesforce" 
                  style={{ width: '150px', height: 'auto', display: 'block', margin: '0 auto' }} 
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                The Future of Work is Here
              </h1>
              <p className="text-xl text-gray-700 mb-4 font-medium">
                Are you building it — or watching it happen?
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name (Optional)
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Acme Corp"
                style={{ borderColor: companyName ? '#0176D3' : '#D1D5DB' }}
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onFocus={(e) => e.target.style.borderColor = '#0176D3'}
                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
              />
              <p className="text-xs text-gray-500 mt-1">We'll personalize your strategy</p>
            </div>

            <button
              onClick={() => setShowCompanyInput(false)}
              style={{ backgroundColor: '#0176D3' }}
              className="w-full text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-lg"
            >
              Start Building Your Strategy →
            </button>

            <button
              onClick={() => {
                setCompanyName('');
                setShowCompanyInput(false);
              }}
              className="w-full mt-3 text-gray-600 hover:text-gray-900 py-2 text-sm"
            >
              Skip
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                <strong className="text-blue-600">Join 150,000 Trailblazers</strong> transforming how work gets done
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="salesforce-font min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Build Your AI Agent Strategy in 5 Minutes
          </h1>
          <p className="text-lg text-gray-600">
            Every question gets you closer to your transformation roadmap
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Progress with Stage */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-${stage.color}-100 text-${stage.color}-800`}>
                  {stage.label}
                </span>
                <span className="text-gray-600">Question {currentProgress + 1} of ~{totalSteps}</span>
              </div>
              <span className="text-gray-600">{Math.round(progressPercent)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                style={{ backgroundColor: '#0176D3', width: `${progressPercent}%` }}
                className="h-2.5 rounded-full transition-all duration-300"
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{curr?.q}</h2>
            {curr?.subtitle && (
              <p className="text-gray-600">{curr.subtitle}</p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {curr?.opts.map((opt, i) => {
              const isSelected = curr.multi ? (multi[step] || []).includes(opt.value || opt.label) : false;
              return (
                <button
                  key={i}
                  onClick={() => handleNext(opt.value || opt.label, opt.next)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {opt.icon && <span className="text-2xl">{opt.icon}</span>}
                      <span className="font-medium text-gray-900">{opt.label}</span>
                    </div>
                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Multi-select continue */}
          {curr?.multi && (multi[step]?.length > 0) && (
            <button
              onClick={confirmMulti}
              className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue with {multi[step].length} selected →
            </button>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-6">
            {history.length > 1 && (
              <button
                onClick={goBack}
                className="flex-1 text-gray-600 hover:text-gray-900 py-2 text-sm flex items-center justify-center gap-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <button
              onClick={reset}
              className="flex-1 text-gray-600 hover:text-gray-900 py-2 text-sm flex items-center justify-center gap-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Start Over
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p className="text-xs">
            Powered by <Tooltip term="Atlas Reasoning Engine">Atlas Reasoning Engine</Tooltip> • 
            <Tooltip term="Zero Copy"> Zero Copy Data 36O</Tooltip> • 
            <Tooltip term="MuleSoft Agent Fabric"> MuleSoft Agent Fabric</Tooltip>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DecisionTree;
