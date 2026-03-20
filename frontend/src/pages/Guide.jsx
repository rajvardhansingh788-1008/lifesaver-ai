import { useState } from 'react';
import { disasterGuideData } from '../data/disasterGuide';
import './Guide.css';

export default function Guide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItem, setExpandedItem] = useState(null);

  // Filter data based on search
  const filteredData = disasterGuideData.map(category => {
    const filteredItems = category.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...category, items: filteredItems };
  }).filter(category => category.items.length > 0);

  const toggleAccordion = (itemName) => {
    if (expandedItem === itemName) {
      setExpandedItem(null);
    } else {
      setExpandedItem(itemName);
    }
  };

  return (
    <div className="guide-page">
      <div className="guide-header-banner">
        <h1>📖 A-Z Disaster Encyclopedia</h1>
        <p>Comprehensive survival guides for over 20+ life-threatening situations.</p>
        
        <div className="guide-search-wrapper">
          <input 
            type="text" 
            placeholder="Search for a disaster (e.g., Earthquake, Fire...)" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="guide-search-input"
          />
        </div>
      </div>

      <div className="guide-content">
        {filteredData.length === 0 ? (
          <div className="guide-no-results">
            <h2>No disasters found matching "{searchTerm}"</h2>
            <p>Try searching with broader terms.</p>
          </div>
        ) : (
          filteredData.map((category, catIndex) => (
            <div key={catIndex} className="guide-category">
              <h2 className="guide-category-title">{category.category}</h2>
              <div className="guide-items-list">
                {category.items.map((item, itemIndex) => {
                  const isExpanded = expandedItem === item.name;
                  return (
                    <div 
                      key={itemIndex} 
                      className={`guide-item-card ${isExpanded ? 'expanded' : ''}`}
                    >
                      <div 
                        className="guide-item-header" 
                        onClick={() => toggleAccordion(item.name)}
                      >
                       <h3>{item.name}</h3>
                       <span className="guide-expand-icon">{isExpanded ? '−' : '+'}</span>
                      </div>
                      
                      {isExpanded && (
                        <div className="guide-item-body">
                          <p className="guide-item-desc">{item.description}</p>
                          
                          <div className="guide-actions-grid">
                            <div className="guide-action-box immediate">
                              <h4>⚡ Immediate Actions</h4>
                              <ul>
                                {item.immediateActions.map((action, i) => (
                                  <li key={i}>{action}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="guide-action-box danger">
                              <h4>❌ What NOT To Do</h4>
                              <ul>
                                {item.whatNotToDo.map((action, i) => (
                                  <li key={i}>{action}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="guide-action-box prep">
                              <h4>🛡️ Preparation</h4>
                              <ul>
                                {item.preparation.map((action, i) => (
                                  <li key={i}>{action}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
