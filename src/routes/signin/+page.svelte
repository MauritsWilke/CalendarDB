<script lang="ts">
    import { goto } from "$app/navigation";
    import { currentUser } from "$lib/stores/authStore";

    import GoogleSignIn from "$lib/components/GoogleSignIn/index.svelte";
    import InputField from "$lib/components/InputField/index.svelte";
    import SignInButton from "$lib/components/SignInButton/index.svelte";
    import LogoHeader from "$lib/components/LogoHeader/index.svelte";

    import { signInWithGoogle, signInWithEmailAndPassword, signOut } from "$lib/scripts/firebase";

    let email: string;
    let password: string;

    async function _signInWithGoogle() {
        await signInWithGoogle();
        goto("/");
    }

    async function _signInWithEmailAndPassword() {
        await signInWithEmailAndPassword(email, password);
        goto("/");
    }

    async function _signOut() {
        await signOut();
        goto("/signin");
    }
</script>

<div id="wrapper">
    <div id="leftSide">
        <div id="header">
            <LogoHeader />
        </div>

        <div id="signInWrapper">
            <div id="signIn">
                <div id="header">
                    <p id="title">Sign in</p>
                    <p id="subtitle">Please enter your details</p>
                </div>

                <div id="content">
                    <div id="emailLogin">
                        <div id="email">
                            <p id="label">EMAIL</p>
                            <InputField placeholder="name@email.com" bind:value={email} />
                        </div>
                        <div id="password">
                            <p id="label">PASSWORD</p>
                            <InputField placeholder="password" bind:value={password} type="password" />
                        </div>
                        <div id="text">
                            <button id="forgotPassword" on:click={_signOut}>Forgot password?</button>
                        </div>
                    </div>
                    <div id="buttons">
                        <SignInButton on:click={_signInWithEmailAndPassword} />
                        <GoogleSignIn on:click={_signInWithGoogle} />
                    </div>

                    <div id="noAccount">
                        <pre id="default">Don't have an account? </pre>
                        <a href="/signin" id="highlight">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="rightSide">
        <div id="imageHolder">
            <img src="/loginImage.png" alt="hero" />
        </div>
    </div>
</div>

<style lang="scss">
    @mixin inputField {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        align-self: stretch;

        #label {
            color: $primary-grey-70;
            font-family: Work Sans;
            font-size: 0.75rem;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }
    }

    :global(*) {
        padding: 0px;
        margin: 0px;
        box-sizing: border-box;
    }

    #wrapper {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex: 1 0 0;
        align-self: stretch;

        #leftSide {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            width: 50vw;
            height: 100vh;
            min-width: 50rem;

            #header {
                display: flex;
                width: 100%;
                box-sizing: border-box;
                height: 4.6875rem;
                padding: 0.875rem 0.9375rem;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                gap: 0.5rem;
                flex-shrink: 0;
            }

            #signInWrapper {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;

                #signIn {
                    display: flex;
                    width: 25rem;

                    flex: 1;
                    flex-direction: column;
                    align-items: flex-start;
                    align-self: center;
                    gap: 3rem;

                    #header {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.5rem;
                        align-self: stretch;

                        padding: 0px;

                        #title {
                            color: $primary-grey;
                            font-family: Work Sans;
                            font-size: 3rem;
                            font-style: normal;
                            font-weight: 600;
                            line-height: normal;
                            letter-spacing: -0.045rem;
                        }

                        #subtitle {
                            color: $primary-grey-70;
                            font-family: Work Sans;
                            font-size: 1rem;
                            font-style: normal;
                            font-weight: 500;
                            line-height: normal;
                            letter-spacing: -0.015rem;
                        }
                    }

                    #content {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 2rem;
                        align-self: stretch;

                        #emailLogin {
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 1.5rem;
                            align-self: stretch;

                            #email {
                                @include inputField;
                            }

                            #password {
                                @include inputField;
                            }

                            #text {
                                display: flex;
                                justify-content: flex-end;
                                align-items: center;
                                align-self: stretch;

                                #forgotPassword {
                                    border: 0px;
                                    padding: 0px;
                                    background-color: #ffffff00;

                                    color: $highlight-blue-border;
                                    text-align: center;
                                    leading-trim: both;
                                    text-edge: cap;
                                    font-family: Work Sans;
                                    font-size: 0.75rem;
                                    font-style: normal;
                                    font-weight: 500;
                                    line-height: normal;
                                    text-decoration-line: underline;

                                    cursor: pointer;
                                }
                            }
                        }

                        #buttons {
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 1.5rem;
                            align-self: stretch;
                        }

                        #noAccount {
                            display: flex;
                            flex-direction: row;
                            justify-content: center;
                            align-self: stretch;

                            #default {
                                color: $primary-grey-70;
                                leading-trim: both;
                                text-edge: cap;
                                font-family: Work Sans;
                                font-size: 0.75rem;
                                font-style: normal;
                                font-weight: 500;
                                line-height: normal;
                            }

                            #highlight {
                                color: $highlight-blue-border;
                                leading-trim: both;
                                text-edge: cap;
                                font-family: Work Sans;
                                font-size: 0.75rem;
                                font-style: normal;
                                font-weight: 600;
                                line-height: normal;
                            }
                        }
                    }
                }
            }
        }

        #rightSide {
            display: none;
            flex: 1;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;

            height: 100vh;

            #imageHolder {
                display: flex;
                width: 56.69925rem;
                transform: rotate(2deg);
                padding-bottom: 0px;
                flex-direction: column;
                align-items: center;

                overflow: hidden;

                box-shadow: -8px 0px 20px 0px rgba(59, 59, 59, 0.25);

                img {
                    width: 126.14844rem;
                    height: 74.36575rem;
                }
            }
        }
    }
</style>
