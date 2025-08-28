package com.nowcoder.community.entity;

/**
 * Encapsulate page information
 */
public class Page {

    // current page number
    private int current = 1;
    // limit num per page
    private int limit = 10;
    // total number of post, for calculating total number of pages
    private int rows;
    // path of link (for page link)
    private String path;

    public int getCurrent() {
        return current;
    }

    public void setCurrent(int current) {
        if(current >= 1) {
            this.current = current;
        }
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        if(limit >= 1 && limit <= 100) {
            this.limit = limit;
        }
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        if(rows >= 0) {
            this.rows = rows;
        }
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    /**
     * get offset for current page
     * @return
     */
    public int getOffset() {
        // current * limit - limit
        return (current - 1) * limit;
    }

    /**
     * get total number of pages
     * @return
     */
    public int getTotal() {
        // rows / limit  [+1]
        if(rows % limit == 0) {
            return rows / limit;
        } else {
            return rows / limit + 1;
        }
    }

    /**
     * get the first page number shown in the navigation
     * @return
     */
    public int getFrom() {
        int from = current - 3;
        return from < 1 ? 1 : from;
    }

    /**
     * get the last page number shown in the navigation
     * @return
     */
    public int getTo() {
        int to = current + 3;
        int total = getTotal();
        return  to > total ? total : to;
    }
}
