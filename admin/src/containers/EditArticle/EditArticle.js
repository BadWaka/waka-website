import React, {
    Component
} from 'react';

import style from './style.scss';

import {
    AppBar,
    TextField,
} from 'material-ui';

// markdown 解析器和编译器
import marked from 'marked';

// highlight.js css 有很多样式，可以自己选
import 'highlightjs/styles/atom-one-light.css';
// highlight.js
import highlightjs from 'highlightjs';

class EditArticle extends Component {

    constructor() {
        super();

        // 左侧编辑栏是否滚动到底部，用来判断如果左侧编辑栏已经在底部了，当内容改变时，右侧内容同时也滚动到底部
        this.isLeftEditScrollToBottom = false;
    }

    componentWillMount() {
        const {
            setMode,
            setArticleTitle,
            setArticleContent
        } = this.props;

        // 设置模式
        setMode(0);

        // localStorage 缓存临时值
        const tempArticleTitle = localStorage.getItem('tempArticleTitle');
        if (tempArticleTitle) {
            setArticleTitle(tempArticleTitle);
        }

        const tempArticleContent = localStorage.getItem('tempArticleContent');
        if (tempArticleContent) {
            setArticleContent(tempArticleContent);
        }

    }

    componentDidUpdate() {
        // 获得真实 dom
        const doms = document.querySelectorAll('pre code');
        // 每次更新都要重新 highlight 一下 <pre><code> 标签
        this._highlightPreCode(doms);
    }

    // 文章标题变化
    handleArticleTitleChange(event, value) {
        const {
            setArticleTitle
        } = this.props;

        setArticleTitle(value);
        localStorage.setItem('tempArticleTitle', value);    // 写入localStorage中
    }

    // 文章内容变化
    handleArticleContentChange(event, value) {
        const {
            setArticleContent
        } = this.props;

        setArticleContent(value);
        localStorage.setItem('tempArticleContent', value);    // 写入localStorage中

        // 左侧编辑栏滚动到底部时
        const contentEditTextArea = document.getElementById('contentEditTextArea');
        if (contentEditTextArea.scrollTop === contentEditTextArea.scrollHeight - contentEditTextArea.offsetHeight) {
            // 每次编辑完内容使右侧预览dom滚动到底部
            this._rightPreviewScrollToBottom();
        }

    }

    // 高亮 <pre><code> 的代码
    _highlightPreCode(doms) {
        for (let i = 0; i < doms.length; i++) {
            highlightjs.highlightBlock(doms[i]);
        }
    }

    // 右侧预览dom滚动到底部
    _rightPreviewScrollToBottom() {
        const rightPreview = document.getElementById('rightPreview');
        rightPreview.scrollTop = rightPreview.scrollHeight;
    }

    render() {

        const {
            mode,
            articleTitle,
            articleContent
        } = this.props;

        // 根据模式设置标题
        const appBarTitle = mode === 0 ? '新建作品' : '编辑作品';

        // 将 articleContent 用 marked 转化为 markdown 格式
        let articleContentMarkdown = null;
        if (articleContent) {
            articleContentMarkdown = marked(articleContent);
        }

        return <section className={style.editArticle}>
            {/* Header */}
            {/*<AppBar className={style.header} title={appBarTitle}/>*/}
            {/* 主体 */}
            <section className={style.main}>
                {/* 左侧编辑框 */}
                <section
                    className={style.left}>
                    <TextField
                        value={articleTitle}
                        hintText="请填写标题"
                        floatingLabelText="标题"
                        fullWidth={true}
                        onChange={this.handleArticleTitleChange.bind(this)}/>
                    <TextField
                        id="contentEditTextArea"
                        className={style.contentEditTextArea}
                        value={articleContent}
                        floatingLabelText="内容"
                        multiLine={true}
                        rowsMax={35}    // 这里可以设置最大高度，但是只能根据行数来
                        fullWidth={true}
                        onChange={this.handleArticleContentChange.bind(this)}/>
                </section>
                {/* 右侧预览框 */}
                <section
                    id="rightPreview"
                    className={style.right}>
                    {/* 标题 */}
                    <h1 className={style.articleTitle}>{articleTitle}</h1>
                    {/* 内容 */}
                    <section
                        className={style.articleContent}
                        // 因为这里是 marked 转换过的 html，而 React 不能直接输出 html，所以需要放在 dangerouslySetInnerHTML 这个属性里
                        dangerouslySetInnerHTML={{__html: articleContentMarkdown}}/>
                </section>
            </section>
        </section>;
    }
}

/************************** Redux **************************/

import {
    connect
} from 'react-redux';

import {
    setMode,
    setArticleTitle,
    setArticleContent
} from '../../reducers/EditArticle';

const mapStateToProps = (state) => {
    return {
        mode: state.editArticle.mode,
        articleTitle: state.editArticle.articleTitle,
        articleContent: state.editArticle.articleContent,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setMode: (mode) => {
            dispatch(setMode(mode));
        },
        setArticleTitle: (articleTitle) => {
            dispatch(setArticleTitle(articleTitle));
        },
        setArticleContent: (articleContent) => {
            dispatch(setArticleContent(articleContent));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);