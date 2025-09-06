package com.nowcoder.community.util;

import org.apache.commons.lang3.CharUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

@Component
public class SensitiveFilter {

    private static final Logger logger = LoggerFactory.getLogger(SensitiveFilter.class);

    private static final String REPLACEMENT = "***";

    // root node
    private TrieNode rootNode = new TrieNode();

    @PostConstruct
    public void init() {
        try (
                InputStream is = this.getClass().getClassLoader().getResourceAsStream("sensitive-words.txt");
                BufferedReader reader = new BufferedReader(new InputStreamReader(is));
                ) {
            String keyword;
            while ((keyword = reader.readLine()) != null) {
                // add to Tire
                this.addKeyWord(keyword);
            }
        } catch (IOException e) {
            logger.error("loading sensitive-word failure" + e.getMessage());
        }

    }

    // add a sensitive word into Tire
    private void addKeyWord(String keyword) {
        TrieNode tmpNode = rootNode;
        for (int i = 0; i < keyword.length(); i++) {
            char c = keyword.charAt(i);
            TrieNode subNode = tmpNode.getSubNode(c);

            if (subNode == null) {
                // init sub node
                subNode = new TrieNode();
                tmpNode.addSubNode(c, subNode);
            }

            // point to subNode
            tmpNode = subNode;

            // mark end of word
            if (i == keyword.length()-1) {
                tmpNode.setKeywordEnd(true);
            }
        }
    }

    /**
     * filter sensitive word
     * @param text before filter
     * @return content after filter
     */
    public String filter(String text) {
        if (StringUtils.isBlank(text)) {
            return  null;
        }

        // pointer 1
        TrieNode tmpNode = rootNode;
        // pointer 2
        int begin = 0;
        // pointer 3
        int position = 0;
        // resulted text
        StringBuilder sb = new StringBuilder();

        while(position < text.length()) {
            char c = text.charAt(position);

            // skip symbols
            if (isSymbol(c)) {
                // if pointer 1 is at root position, put this character into result
                // and move pointer 2 to the next
                if (tmpNode == rootNode) {
                    sb.append(c);
                    begin++;
                }
                // position 3 will move to next when either pointer 1 is at root or not
                position++;
                continue;
            }

            // check child node
            tmpNode = tmpNode.getSubNode(c);
            if (tmpNode == null) {
                // text begin with begin is not sensitive word
                sb.append(text.charAt(begin));
                // go to next position
                position = ++ begin;
                // pointer 1 go to root
                tmpNode = rootNode;
            } else if (tmpNode.isKeywordEnd()) {
                // found sensitive word
                sb.append(REPLACEMENT);
                // go to next position
                begin = ++position;
                // pointer 1 go to root
                tmpNode = rootNode;
            } else {
                // check next character
                position++;
            }

        }

        // put last characters into result
        sb.append(text.substring(begin));

        return sb.toString();
    }

    // Check if the character is a symbol
    private boolean isSymbol(Character c) {
        // 0x2E80~0x9FFF is east Asian characters
        return !CharUtils.isAsciiAlphanumeric(c) && (c < 0x2E80 || c > 0x9FFF);
    }

    // Trie Data Structure
    private class TrieNode {

        // end of sensitive character
        private boolean isKeywordEnd = false;

        // children nodes (key is character, value is TrieNode)
        private Map<Character, TrieNode> subNodes = new HashMap<>();

        public boolean isKeywordEnd() {
            return isKeywordEnd;
        }

        public void setKeywordEnd(boolean keywordEnd) {
            isKeywordEnd = keywordEnd;
        }

        // add children nodes
        public void addSubNode(Character c, TrieNode node) {
            subNodes.put(c, node);
        }

        // get child node
        public TrieNode getSubNode(Character c) {
            return subNodes.get(c);
        }
    }

}
