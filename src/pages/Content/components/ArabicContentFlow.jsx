import React from 'react';
import ArabicText from '../../../common/components/ArabicText';
import UrduText from '../../../common/components/UrduText';

const ArabicContentFlow = ({ contentItems }) => {
  const formatArabicItem = (text) => {
    if (!text) return '';
    const processed = text.replace(/\s*◯\s*/g, '  ◯  ').trim();
    if (processed.length === 0) return '';
    const lastChar = processed[processed.length - 1];
    const punctuationRegex = /[:.,،،!?◯۝]/;
    if (punctuationRegex.test(lastChar)) {
      return processed + ' ';
    }
    return processed + '  ◯  ';
  };

  const renderSegments = () => {
    const segments = [];
    let currentArabicGroup = [];

    const flushArabicGroup = (key) => {
      if (currentArabicGroup.length > 0) {
        const combinedText = currentArabicGroup.join('');
        segments.push(
          <ArabicText 
            key={`arabic-group-${key}`} 
            className="text-slate-800 dark:text-slate-200 my-4 leading-[58px]">
            {combinedText}
          </ArabicText>
        );
        currentArabicGroup = [];
      }
    };

    contentItems.forEach((item, idx) => {
      // 1. If there are beforeExplanations, flush any accumulated Arabic group first
      if (item.beforeExplanations && item.beforeExplanations.length > 0) {
        flushArabicGroup(`before-${idx}`);
        item.beforeExplanations.forEach((exp, expIdx) => {
          segments.push(
            <UrduText key={`before-${item.id || idx}-${expIdx}`}>
              {exp.explanation_text}
            </UrduText>
          );
        });
      }

      // 2. Accumulate the Arabic text if it exists
      if (item.arabic_text) {
        const formattedText = formatArabicItem(item.arabic_text);
        if (formattedText) {
          currentArabicGroup.push(formattedText);
        }
      }

      // 3. If there are afterExplanations, flush the Arabic group including this item's text, then render explanations
      if (item.afterExplanations && item.afterExplanations.length > 0) {
        flushArabicGroup(`after-${idx}`);
        item.afterExplanations.forEach((exp, expIdx) => {
          segments.push(
            <UrduText key={`after-${item.id || idx}-${expIdx}`}>
              {exp.explanation_text}
            </UrduText>
          );
        });
      }
    });

    // 4. Flush any remaining accumulated Arabic text at the end
    flushArabicGroup('final');

    return segments;
  };

  return <React.Fragment>{renderSegments()}</React.Fragment>;
};

export default ArabicContentFlow;
