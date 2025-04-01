'use client'

import { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Calendar, 
  MonitorSmartphone, 
  Video, 
  Download, 
  Ban, 
  ArrowRight,
  BarChart4,
  CircleDollarSign,
  ChevronDown,
  Clock,
  Tag,
  Music,
  Headphones,
  Gamepad2,
  Trophy
} from 'lucide-react';

export default function ComparisonTable({ 
  subscriptions, 
  selectedPaymentType = 'monthly' 
}) {
  const [paymentType, setPaymentType] = useState(selectedPaymentType);
  const [expandedFeatures, setExpandedFeatures] = useState({});
  
  // Format price with 2 decimal places
  const formatPrice = (price) => {
    return price.toFixed(2).replace('.', ',') + ' zł';
  };
  
  // Get price based on payment type
  const getPrice = (subscription) => {
    if (paymentType === 'yearly' && subscription.priceYearly) {
      return (
        <div>
          <span className="font-semibold">{(subscription.priceYearly / 12).toFixed(2).replace('.', ',')} zł</span>
          <span className="text-xs text-light-400">/mies.*</span>
        </div>
      );
    } else {
      return (
        <div>
          <span className="font-semibold">{formatPrice(subscription.priceMonthly)}</span>
        </div>
      );
    }
  };
  
  // Render boolean values as icons
  const renderBoolean = (value) => {
    if (value === true) {
      return (
        <div className="flex justify-center">
          <CheckCircle className="w-6 h-6 text-secondary-500" />
        </div>
      );
    } else {
      return (
        <div className="flex justify-center">
          <XCircle className="w-6 h-6 text-light-500/50" />
        </div>
      );
    }
  };
  
  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'streaming':
        return <Video className="w-5 h-5 text-blue-400" />;
      case 'music':
        return <Music className="w-5 h-5 text-pink-400" />;
      case 'gaming':
        return <Gamepad2 className="w-5 h-5 text-green-400" />;
      case 'audiobooks':
        return <Headphones className="w-5 h-5 text-amber-400" />;
      case 'sport':
        return <Trophy className="w-5 h-5 text-red-400" />;
      default:
        return <Video className="w-5 h-5 text-blue-400" />;
    }
  };
  
  // Toggle expanded features
  const toggleExpandFeatures = (id) => {
    setExpandedFeatures(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Check if we have any subscriptions
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="rounded-xl glass p-10 text-center">
        <p className="text-xl text-light-300 mb-4">Brak subskrypcji do porównania.</p>
        <Link href="/compare" className="btn-primary inline-block">
          Wybierz subskrypcje do porównania
        </Link>
      </div>
    );
  }

  // Define table columns based on subscription category
  const getColumnsForCategory = (subscriptions) => {
    // Get all unique categories
    const categories = [...new Set(subscriptions.map(sub => sub.category))];
    
    // Base columns for all subscription types
    const baseColumns = [
      { id: 'subscription', label: 'Subskrypcja', icon: null },
      { id: 'price', label: 'Cena', icon: <CircleDollarSign className="w-4 h-4" /> },
      { id: 'rating', label: 'Ocena', icon: <BarChart4 className="w-4 h-4" /> },
      { id: 'trial', label: 'Okres próbny', icon: <Calendar className="w-4 h-4" /> },
      { id: 'actions', label: 'Akcje', icon: null },
    ];
    
    // Add category specific columns
    if (categories.includes('streaming') || categories.includes('sport')) {
      baseColumns.splice(2, 0, 
        { id: 'screens', label: 'Liczba ekranów', icon: <MonitorSmartphone className="w-4 h-4" /> },
        { id: 'resolution', label: 'Jakość', icon: <Video className="w-4 h-4" /> },
        { id: 'offline', label: 'Offline', icon: <Download className="w-4 h-4" /> },
        { id: 'adsFree', label: 'Bez reklam', icon: <Ban className="w-4 h-4" /> }
      );
    } else if (categories.includes('music') || categories.includes('audiobooks')) {
      baseColumns.splice(2, 0, 
        { id: 'offline', label: 'Offline', icon: <Download className="w-4 h-4" /> },
        { id: 'adsFree', label: 'Bez reklam', icon: <Ban className="w-4 h-4" /> }
      );
    } else if (categories.includes('gaming')) {
      baseColumns.splice(2, 0, 
        { id: 'offline', label: 'Offline', icon: <Download className="w-4 h-4" /> },
        { id: 'platforms', label: 'Platformy', icon: <Gamepad2 className="w-4 h-4" /> }
      );
    }
    
    return baseColumns;
  };
  
  // Get columns based on current subscriptions
  const columns = getColumnsForCategory(subscriptions);

  // Get a value for a dynamic column
  const getDynamicColumnValue = (subscription, columnId) => {
    switch(columnId) {
      case 'platforms':
        return subscription.features?.find(f => f.name === 'Platformy')?.value || 'N/A';
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Payment type toggle */}
      <div className="flex justify-end mb-4">
        <div className="inline-flex glass rounded-lg p-1">
          <button
            className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
              paymentType === 'monthly' 
                ? 'bg-primary-500 text-white' 
                : 'text-light-300 hover:text-white'
            }`}
            onClick={() => setPaymentType('monthly')}
          >
            Miesięcznie
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
              paymentType === 'yearly' 
                ? 'bg-primary-500 text-white' 
                : 'text-light-300 hover:text-white'
            }`}
            onClick={() => setPaymentType('yearly')}
          >
            Rocznie
          </button>
        </div>
      </div>
      
      {/* Table container with gradient border */}
      <div className="rounded-xl p-0.5 bg-gradient-to-br from-primary-700/30 via-primary-500/20 to-dark-300">
        <div className="overflow-x-auto rounded-xl glass">
          <table className="w-full border-collapse">
            {/* Table header */}
            <thead>
              <tr className="bg-dark-100/70">
                {columns.map(column => (
                  <th key={column.id} className="p-4 text-left border-b border-dark-200 font-medium">
                    <div className="flex items-center space-x-2">
                      {column.icon && <span>{column.icon}</span>}
                      <span>{column.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            {/* Table body */}
            <tbody>
              {subscriptions.map((subscription, index) => (
                <>
                  <tr 
                    key={subscription.id} 
                    className={`
                      ${index % 2 === 0 ? 'bg-dark-300/70' : 'bg-dark-200/70'}
                      transition-colors duration-200 hover:bg-dark-100/30
                    `}
                  >
                    {/* Subscription name */}
                    <td className="p-4 border-b border-dark-200/50">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-12 h-12 rounded-md bg-dark-100 p-1 flex items-center justify-center">
                          <div className="w-full h-full flex items-center justify-center">
                            {getCategoryIcon(subscription.category)}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-white">{subscription.name}</div>
                          <div className="text-sm text-light-400">{subscription.provider}</div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Price */}
                    <td className="p-4 text-center border-b border-dark-200/50">
                      {getPrice(subscription)}
                      {paymentType === 'yearly' && subscription.yearlyDiscount > 0 && (
                        <div className="text-xs text-secondary-400 mt-1 flex items-center justify-center">
                          <Tag className="w-3 h-3 mr-1" />
                          {subscription.yearlyDiscount}% taniej
                        </div>
                      )}
                    </td>
                    
                    {/* Dynamic columns based on category */}
                    {columns.map(column => {
                      if (column.id === 'subscription' || column.id === 'price' || column.id === 'rating' || column.id === 'trial' || column.id === 'actions') {
                        return null; // These are handled separately
                      }
                      
                      return (
                        <td key={column.id} className="p-4 text-center border-b border-dark-200/50">
                          {column.id === 'screens' && (
                            <div className="py-1 px-3 bg-dark-100/50 rounded-full inline-block">
                              <span className="font-medium">{subscription.screens}</span>
                            </div>
                          )}
                          
                          {column.id === 'resolution' && (
                            <div className="py-1 px-3 bg-dark-100/50 rounded-full inline-block">
                              <span className="font-medium">{subscription.resolution}</span>
                            </div>
                          )}
                          
                          {column.id === 'offline' && renderBoolean(subscription.offlineViewing)}
                          
                          {column.id === 'adsFree' && renderBoolean(subscription.adsFree)}
                          
                          {column.id === 'platforms' && (
                            <div className="py-1 px-3 bg-dark-100/50 rounded-full inline-block">
                              <span className="font-medium">{getDynamicColumnValue(subscription, 'platforms')}</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                    
                    {/* Rating */}
                    <td className="p-4 text-center border-b border-dark-200/50">
                      <div className="flex items-center justify-center">
                        <div className="bg-dark-100/50 py-1 px-3 rounded-full flex items-center">
                          <span className="text-amber-400 font-semibold">{subscription.rating.toFixed(1)}</span>
                          <span className="text-light-500 text-xs ml-1">/5</span>
                        </div>
                      </div>
                    </td>
                    
                    {/* Trial period */}
                    <td className="p-4 text-center border-b border-dark-200/50">
                      {subscription.trialPeriod > 0 ? (
                        <div className="flex items-center justify-center">
                          <Clock className="w-4 h-4 text-secondary-500 mr-1" />
                          <span className="font-medium">{subscription.trialPeriod} dni</span>
                        </div>
                      ) : (
                        <span className="text-light-500">Brak</span>
                      )}
                    </td>
                    
                    {/* Actions */}
                    <td className="p-4 text-center border-b border-dark-200/50">
                      <div className="flex space-x-2 justify-center">
                        <Link
                          href={subscription.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary-500 text-white py-2 px-3 rounded-lg text-sm inline-flex items-center hover:bg-primary-600 transition-colors"
                        >
                          Odwiedź
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                        
                        <button
                          onClick={() => toggleExpandFeatures(subscription.id)}
                          className="bg-dark-100 text-light-300 py-2 px-3 rounded-lg text-sm inline-flex items-center hover:bg-dark-300 hover:text-white transition-colors"
                        >
                          Szczegóły
                          <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                            expandedFeatures[subscription.id] ? 'rotate-180' : ''
                          }`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded features row */}
                  {expandedFeatures[subscription.id] && (
                    <tr className="bg-dark-100/30">
                      <td colSpan={columns.length} className="p-4 border-b border-dark-200/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-down">
                          {subscription.features && subscription.features.map((feature, idx) => (
                            <div key={idx} className="glass p-3 rounded-lg">
                              <div className="text-sm text-light-400">{feature.name}:</div>
                              <div className="font-medium text-white">{feature.value}</div>
                            </div>
                          ))}
                          
                          {subscription.tags && (
                            <div className="glass p-3 rounded-lg">
                              <div className="text-sm text-light-400 mb-2">Tagi:</div>
                              <div className="flex flex-wrap gap-2">
                                {subscription.tags.map((tag, idx) => (
                                  <span key={idx} className="badge-primary text-xs">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="glass p-3 rounded-lg">
                            <div className="text-sm text-light-400 mb-1">Opis:</div>
                            <div className="text-light-300 text-sm">
                              {subscription.description || 'Brak opisu'}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Payment info */}
      {paymentType === 'yearly' && (
        <div className="mt-2 text-sm text-light-400 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          * Cena miesięczna przy płatności rocznej z góry
        </div>
      )}
    </div>
  );
}