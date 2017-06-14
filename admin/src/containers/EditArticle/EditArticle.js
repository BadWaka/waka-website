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

class EditArticle extends Component {

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
            <AppBar className={style.header} title={appBarTitle}/>
            {/* 主体 */}
            <section className={style.main}>
                {/* 左侧编辑框 */}
                <section className={style.left}>
                    <TextField
                        value={articleTitle}
                        hintText="请填写标题"
                        floatingLabelText="标题"
                        fullWidth={true}
                        onChange={this.handleArticleTitleChange.bind(this)}/>
                    <TextField
                        className={style.contentEditTextArea}
                        value={articleContent}
                        floatingLabelText="内容"
                        multiLine={true}
                        rows={30}
                        rowsMax={30}
                        fullWidth={true}
                        onChange={this.handleArticleContentChange.bind(this)}/>
                </section>
                {/* 右侧预览框 */}
                <section className={style.right}>
                    {/* 标题 */}
                    <h1 className={style.articleTitle}>{articleTitle}</h1>
                    {/* 内容 因为这里是 marked 转换过的 html，而 React 不能直接输出 html，所以需要放在 dangerouslySetInnerHTML 这个属性里 */}
                    <section
                        className={style.articleContent}
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