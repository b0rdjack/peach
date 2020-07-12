import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Card,
  Layout,
  Text,
  Icon,
  Input,
  Select,
  SelectItem,
  Divider,
  Button,
  IndexPath,
} from "@ui-kitten/components";
import { KeyboardAvoidingView } from "../login/3rd-party";
import { color } from "react-native-reanimated";
import { API_URL } from "../../constant";
import { createAlert } from "../../components/Alert";
import * as Location from "expo-location";

const ClockIcon = (props) => <Icon name="clock" {...props} />;

const AmountIcon = (props) => <Icon name="credit-card" {...props} />;

const NavigationIcon = (props) => <Icon name="navigation-2" {...props} />;

const CategoryIcon = (props) => <Icon name="menu-2" {...props} />;

const TagIcon = (props) => <Icon name="pricetags" {...props} />;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      duration: "00:00",
      showDurationError: true,
      amount: "00.00",
      showAmountError: false,
      loading: false,
      subcategories: [],
      showSubcategoryError: true,
      selectedSubcategories: [],
      selectedSubcategoriesIndex: [],
      selectedSubcategoriesLabel: "",
      tags: [],
      showTagError: true,
      selectedTags: [],
      selectedTagsIndex: [],
      selectedTagsLabel: "",
      transports: [],
      showTransportError: true,
      selectedTransport: "",
      location_permission: false,
      location: {
        latitude: null,
        longitude: null,
      },
      disable: false,
    };
  }
  async componentDidMount() {
    await this._getToken();
    await this._getFilters();
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Parcours
          </Text>
          <Text style={styles.filterLabel} category="s1" status="control">
            Définition du parcours
          </Text>
          {this.state.loading == false ? (
            <></>
          ) : (
            <ActivityIndicator size="large" color="#fff" />
          )}
        </View>
        <Layout style={styles.formContainer} level="1">
          <Input
            disabled={this.state.loading}
            label="Durée maximum du parcours en heure"
            size="large"
            accessoryRight={ClockIcon}
            value={this.state.duration}
            onChangeText={this.setDuration}
            caption={
              this.state.showDurationError
                ? "La durée n'est pas valide (ex: 00:45). Saisir au minimum 45 minutes."
                : ""
            }
          />
          <Input
            disabled={this.state.loading}
            label="Prix maximum par personne"
            size="large"
            style={styles.input}
            accessoryRight={AmountIcon}
            value={this.state.amount}
            onChangeText={this.setAmount}
            caption={
              this.state.showAmountError
                ? "Le montant n'est pas valide (ex: 10.45)"
                : ""
            }
          />

          <Divider style={styles.input} />

          <Select
            disabled={this.state.loading}
            style={styles.input}
            placeholder="Mode de transport"
            accessoryLeft={NavigationIcon}
            value={this.state.selectedTransport.label}
            onSelect={(index) => this.setSelectedTransport(index)}
            size="large"
            caption={
              this.state.showTransportError
                ? "Veuillez sélectionner un mode de transport"
                : ""
            }
          >
            {this.state.transports.map((transport) => (
              <SelectItem title={transport.label} key={transport.id} />
            ))}
          </Select>

          <Select
            disabled={this.state.loading}
            style={styles.input}
            placeholder="Catégorie d'activités souhaitées"
            accessoryLeft={CategoryIcon}
            size="large"
            multiSelect={true}
            value={this.state.selectedSubcategoriesLabel}
            onSelect={(index) => this.setSelectedSubcategories(index)}
            selectedIndex={this.state.selectedSubcategoriesIndex}
            caption={
              this.state.showSubcategoryError
                ? "Veuillez sélectionner au moins une catégorie"
                : ""
            }
          >
            {this.state.subcategories.map((subcategories) => (
              <SelectItem title={subcategories.label} key={subcategories.id} />
            ))}
          </Select>
          <Select
            disabled={this.state.loading}
            style={styles.input}
            placeholder="Tag d'activités souhaitées"
            accessoryLeft={TagIcon}
            size="large"
            multiSelect={true}
            value={this.state.selectedTagsLabel}
            onSelect={(index) => this.setSelectedTags(index)}
            selectedIndex={this.state.selectedTagsIndex}
            caption={
              this.state.showTagError
                ? "Veuillez sélectionner au moins un tag"
                : ""
            }
          >
            {this.state.tags.map((tags) => (
              <SelectItem title={tags.label} key={tags.id} />
            ))}
          </Select>
        </Layout>
        <Button
          style={styles.searchButton}
          onPress={this._onSearch}
          size="giant"
          disable={this.state.loading}
        >
          Générer un parcours !
        </Button>
      </KeyboardAvoidingView>
    );
  }

  setDuration = (value) => {
    if (value == "00:00") {
      this.setState({
        duration: value,
        showDurationError: true,
      });
    } else if (this.checkTimeValidity(value)) {
      this.setState({
        duration: value,
        showDurationError: false,
      });
    } else {
      this.setState({
        duration: value,
        showDurationError: true,
      });
    }
  };

  // Return true if valid
  checkTimeValidity = (value) => {
    let splited = value.split(":");
    let hour = splited[0];
    let minute = splited[1];
    let validity = true;

    if (this.isInt(hour) && this.isInt(minute)) {
      hour = parseInt(hour, 10);
      minute = parseInt(minute, 10);
      // Hour not more than 23 or minutes not mort than 59. OR (not less than 30 minutes)
      if (hour > 23 || minute > 59 || (hour == 0 && minute < 45)) {
        validity = false;
      }
    } else {
      validity = false;
    }
    return validity;
  };

  isInt = (value) => {
    return (
      !isNaN(value) &&
      (function (x) {
        return (x | 0) === x;
      })(parseFloat(value))
    );
  };

  setAmount = (value) => {
    if (this.checkAmountValidity(value)) {
      this.setState({
        amount: value,
        showAmountError: false,
      });
    } else {
      this.setState({
        amount: value,
        showAmountError: true,
      });
    }
  };

  checkAmountValidity = (value) => {
    let splited = value.split(".");
    let euro = splited[0];
    let cents = splited[1];
    let validity = true;

    if (this.isInt(euro) && this.isInt(cents)) {
      euro = parseInt(euro, 10);
      cents = parseInt(cents, 10);

      if (cents > 99) {
        validity = false;
      }
    } else {
      validity = false;
    }
    return validity;
  };

  setSelectedTransport = (value) => {
    this.setState({
      selectedTransport: this.state.transports[value.row],
      showTransportError: false,
    });
  };

  setSelectedSubcategories = (values) => {
    let selectedSubcategories = [];
    let selectedSubcategoriesIndex = [];
    let selectedSubcategoriesLabel = "";
    values.forEach((value) => {
      let tmp_subcategory = this.state.subcategories[value.row];
      selectedSubcategories.push(tmp_subcategory);
      selectedSubcategoriesIndex.push(new IndexPath(value.row));
      selectedSubcategoriesLabel =
        selectedSubcategoriesLabel + tmp_subcategory.label + ", ";
    });

    this.setState({
      selectedSubcategories: selectedSubcategories,
      selectedSubcategoriesIndex: selectedSubcategoriesIndex,
      selectedSubcategoriesLabel: selectedSubcategoriesLabel.slice(0, -2),
    });
    selectedSubcategoriesLabel.length == 0
      ? this.setState({ showSubcategoryError: true })
      : this.setState({ showSubcategoryError: false });
  };

  setSelectedTags = (values) => {
    let selectedTags = [];
    let selectedTagsIndex = [];
    let selectedTagsLabel = "";

    values.forEach((value) => {
      let tmp_tag = this.state.tags[value.row];
      selectedTags.push(tmp_tag);
      selectedTagsIndex.push(new IndexPath(value.row));
      selectedTagsLabel = selectedTagsLabel + tmp_tag.label + ", ";
    });

    this.setState({
      selectedTags: selectedTags,
      selectedTagsIndex: selectedTagsIndex,
      selectedTagsLabel: selectedTagsLabel.slice(0, -2),
    });
    selectedTagsLabel.length == 0
      ? this.setState({ showTagError: true })
      : this.setState({ showTagError: false });
  };

  _getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    this.setState({
      token: token,
    });
  };

  _getFilters = async () => {
    this.setState({
      loading: true,
    });
    fetch(API_URL + "filters", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: this.state.token,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        this.setState({
          loading: false,
        });
        if (!response.error) {
          this.setState({
            subcategories: response.subcategories,
            tags: response.tags,
            transports: response.transports,
          });
        } else {
          createAlert("Oups !", response.messages, false);
        }
      })
      .catch((e) => {
        this.setState({
          loading: false,
        });
        console.error(e);
      });
  };

  _getLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      this.setState({
        location_permission: false,
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  _onSearch = async () => {
    if (
      this.state.showAmountError ||
      this.state.showDurationError ||
      this.state.showSubcategoryError ||
      this.state.showTagError ||
      this.state.showTransportError
    ) {
      createAlert("Oups !", "Veuillez saisir tous les champs !", true);
    } else {
      this.setState({
        loading: true,
      });
      await this._getLocation();
      if (!this.state.location) {
        createAlert(
          "Oups !",
          "Veuillez autoriser la localisation afin de vous proposer un parcour près de vous !",
          true
        );
        this.setState({
          loading: false,
        });
      } else if (
        !this.state.location.latitude ||
        !this.state.location.longitude
      ) {
        this.setState({
          loading: false,
        });
        createAlert(
          "Oups ! ",
          "Nous n'arrivons pas à récupérer votre position ! \n Veuillez réessayer plus tard.",
          true
        );
      } else {
        fetch(API_URL + "search", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.state.token,
          },
          body: JSON.stringify({
            position: {
              longitude: this.state.location.longitude,
              latitude: this.state.location.latitude,
            },
            duration: this.getSecondes(this.state.duration),
            amount: this.state.amount,
            transport: this.state.selectedTransport,
            tags: this.state.selectedTags,
            subcategories: this.state.selectedSubcategories,
          }),
        })
          .then((response) => response.json())
          .then(async (response) => {
            this.setState({
              loading: false,
            });
            if (!response.error) {
              let journeys = response.journeys;
              journeys[0].sections = journeys[0].sections.concat(
                journeys[0].sections
              );
              this.props.navigation.navigate("Journeys", {
                journeys: journeys.concat(journeys),
                position: {
                  longitude: this.state.location.longitude,
                  latitude: this.state.location.latitude,
                },
              });
            } else {
              createAlert("Oups !", response.messages, false);
            }
          });
      }
    }
  };

  getSecondes = (value) => {
    let splitted = value.split(":");
    let hour = splitted[0] * 3600;
    let minute = splitted[1] * 60;
    return hour + minute;
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
    backgroundColor: "#FFA13D",
  },
  filterLabel: {
    marginTop: 16,
    marginBottom: 16,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  input: {
    marginTop: 16,
  },
  text: {
    margin: 2,
  },
  searchButton: {
    marginVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#FFA13D",
    borderColor: "#FFA13D",
  },
});
